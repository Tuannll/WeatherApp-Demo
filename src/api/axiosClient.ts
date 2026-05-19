import axios from 'axios';

/**
 * Axios instance đã cấu hình sẵn cho OpenWeatherMap API
 * @see https://openweathermap.org/current
 */
const axiosClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptors nếu cần xử lý request/response global sau này
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi toàn cục (nếu cần)
    return Promise.reject(error);
  }
);

export default axiosClient;
