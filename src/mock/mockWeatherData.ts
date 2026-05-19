/**
 * Mock Weather Data
 *
 * Dữ liệu thời tiết giả lập cho 4 điều kiện:
 * sunny (nắng), rainy (mưa), cold (lạnh), cloudy (nhiều mây).
 *
 * ⚠️  File này KHÔNG được xóa — dùng để test và demo offline.
 */

export interface MockWeatherItem {
  /** Mã điều kiện thời tiết */
  condition: 'sunny' | 'rainy' | 'cold' | 'cloudy';
  /** Nhãn hiển thị tiếng Việt */
  label: string;
  /** Mô tả ngắn */
  description: string;
  /** Nhiệt độ (°C) */
  temperature: number;
  /** Độ ẩm (%) */
  humidity: number;
  /** Tốc độ gió (km/h) */
  windSpeed: number;
  /** Icon emoji đại diện */
  icon: string;
}

// ─── Sunny ──────────────────────────────────────────────────────────
export const sunnyWeather: MockWeatherItem = {
  condition: 'sunny',
  label: 'Trời nắng',
  description: 'Trời nắng nóng, nhiệt độ cao, thích hợp các món mát lạnh.',
  temperature: 35,
  humidity: 45,
  windSpeed: 10,
  icon: '☀️',
};

// ─── Rainy ──────────────────────────────────────────────────────────
export const rainyWeather: MockWeatherItem = {
  condition: 'rainy',
  label: 'Trời mưa',
  description: 'Trời mưa ẩm ướt, phù hợp các món nóng hổi.',
  temperature: 24,
  humidity: 85,
  windSpeed: 20,
  icon: '🌧️',
};

// ─── Cold ───────────────────────────────────────────────────────────
export const coldWeather: MockWeatherItem = {
  condition: 'cold',
  label: 'Trời lạnh',
  description: 'Trời lạnh se se, lý tưởng cho lẩu và đồ nướng.',
  temperature: 15,
  humidity: 70,
  windSpeed: 15,
  icon: '❄️',
};

// ─── Cloudy ─────────────────────────────────────────────────────────
export const cloudyWeather: MockWeatherItem = {
  condition: 'cloudy',
  label: 'Trời nhiều mây',
  description: 'Trời nhiều mây, dễ chịu, phù hợp đa dạng món ăn.',
  temperature: 27,
  humidity: 60,
  windSpeed: 12,
  icon: '☁️',
};

/**
 * Danh sách tất cả dữ liệu mock thời tiết.
 * Dùng để random hoặc chọn theo điều kiện khi EXPO_PUBLIC_USE_MOCK=true.
 */
export const allMockWeatherData: MockWeatherItem[] = [
  sunnyWeather,
  rainyWeather,
  coldWeather,
  cloudyWeather,
];
