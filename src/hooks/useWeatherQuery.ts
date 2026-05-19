import { useQuery } from '@tanstack/react-query';
import { ENV } from '../config/env';
import {
  allMockWeatherData,
  MockWeatherItem,
  sunnyWeather,
  rainyWeather,
  coldWeather,
  cloudyWeather,
} from '../mock/mockWeatherData';
import axiosClient from '../api/axiosClient';
import { useWeatherStore } from './useWeatherStore';

export interface OpenWeatherResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

/**
 * Hàm hỗ trợ map dữ liệu trả về từ OpenWeatherMap thành MockWeatherItem
 * để bám sát kiểu dữ liệu cũ mà không làm thay đổi các interface đã có.
 */
const mapOWMToWeatherItem = (data: OpenWeatherResponse): MockWeatherItem => {
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6); // Chuyển m/s sang km/h
  const weatherId = data.weather && data.weather.length > 0 ? data.weather[0].id : 800;

  // Phân loại logic điều kiện dựa vào ID của OpenWeatherMap
  // Tham khảo: https://openweathermap.org/weather-conditions
  let baseWeather = sunnyWeather;

  if (weatherId >= 200 && weatherId < 600) {
    baseWeather = rainyWeather; // Mưa, bão
  } else if ((weatherId >= 600 && weatherId < 700) || temp < 20) {
    baseWeather = coldWeather; // Tuyết hoặc nhiệt độ thấp
  } else if (weatherId >= 700 && weatherId <= 804 && weatherId !== 800) {
    baseWeather = cloudyWeather; // Mây mù, không khí
  } else {
    // 800 là clear sky (Trời quang)
    baseWeather = sunnyWeather;
  }

  // Trộn dữ liệu thực tế vào cấu trúc interface có sẵn
  return {
    ...baseWeather,
    temperature: temp,
    humidity,
    windSpeed,
  };
};

/**
 * Hook fetch thời tiết dùng TanStack Query.
 * Tuyệt đối không dùng useEffect để fetch dữ liệu, quản lý trạng thái tự động qua React Query.
 * Trả về đầy đủ các trạng thái: isLoading, isError, data, v.v.
 *
 * @param lat - Vĩ độ (có thể null/undefined nếu chưa có vị trí)
 * @param lon - Kinh độ (có thể null/undefined nếu chưa có vị trí)
 */
export const useWeatherQuery = (lat: number | undefined | null, lon: number | undefined | null) => {
  return useQuery<MockWeatherItem, Error>({
    // Query key bắt buộc chứa tọa độ (lat, lon) để cache và tự động fetch lại khi tọa độ thay đổi
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      // Lấy trạng thái từ Zustand store
      const { isMockMode, activeMockCondition } = useWeatherStore.getState();

      // Kiểm tra trạng thái mock mode
      if (isMockMode) {
        // Trả về mock data tương ứng với activeMockCondition
        switch (activeMockCondition) {
          case 'rainy':
            return rainyWeather;
          case 'cold':
            return coldWeather;
          case 'cloudy':
            return cloudyWeather;
          case 'sunny':
          default:
            return sunnyWeather;
        }
      }

      // Fetch data thật từ API OpenWeatherMap
      // Lấy apiKey từ môi trường EXPO
      const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || '';

      const response = await axiosClient.get('/weather', {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric', // Sử dụng độ C
          lang: 'vi',      // Ngôn ngữ tiếng Việt
        },
      });

      // Chuẩn hóa dữ liệu OWM về MockWeatherItem
      return mapOWMToWeatherItem(response.data);
    },
    // Tránh fetch khi chưa có tọa độ hợp lệ
    enabled: lat != null && lon != null,
    // Thời gian cache data (ví dụ 5 phút)
    staleTime: 5 * 60 * 1000, 
  });
};
