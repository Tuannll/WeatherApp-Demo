/**
 * Weather Store (Zustand)
 *
 * Store toàn cục để chia sẻ state thời tiết và món ăn giữa các màn hình.
 * Sử dụng Zustand với TypeScript theo pattern curried create<T>()(...)
 *
 * @see https://zustand.docs.pmnd.rs/learn/guides/beginner-typescript
 */

import { create } from 'zustand';

import type { MockWeatherItem } from '../mock/mockWeatherData';
import type { FoodItem } from '../utils/foodSuggestions';
import { ENV } from '../config/env';

export type WeatherCondition = 'sunny' | 'rainy' | 'cold' | 'cloudy';

// ─── State & Actions Interface ──────────────────────────────────────

interface WeatherState {
  /** Dữ liệu thời tiết hiện tại (null khi chưa load) */
  weather: MockWeatherItem | null;

  /** Món ăn mà người dùng đã chọn (null khi chưa chọn) */
  selectedFood: FoodItem | null;

  /** Trạng thái sử dụng dữ liệu mock */
  isMockMode: boolean;

  /** Điều kiện thời tiết giả lập đang chọn */
  activeMockCondition: WeatherCondition;

  /** Cập nhật dữ liệu thời tiết */
  setWeather: (weather: MockWeatherItem | null) => void;

  /** Cập nhật món ăn đã chọn */
  setSelectedFood: (food: FoodItem | null) => void;

  /** Cập nhật trạng thái mock mode */
  setIsMockMode: (isMock: boolean) => void;

  /** Cập nhật điều kiện thời tiết mock */
  setActiveMockCondition: (condition: WeatherCondition) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

/**
 * Hook Zustand dùng để truy cập và cập nhật state thời tiết.
 *
 * Sử dụng trong component:
 * ```tsx
 * const weather = useWeatherStore((s) => s.weather);
 * const setWeather = useWeatherStore((s) => s.setWeather);
 * ```
 *
 * Hoặc destructure nhiều field (dùng useShallow để tối ưu re-render):
 * ```tsx
 * import { useShallow } from 'zustand/react/shallow';
 *
 * const { weather, selectedFood } = useWeatherStore(
 *   useShallow((s) => ({ weather: s.weather, selectedFood: s.selectedFood }))
 * );
 * ```
 */
export const useWeatherStore = create<WeatherState>()((set) => ({
  weather: null,
  selectedFood: null,
  isMockMode: ENV.USE_MOCK,
  activeMockCondition: 'sunny',

  setWeather: (weather) => set(() => ({ weather })),
  setSelectedFood: (food) => set(() => ({ selectedFood: food })),
  setIsMockMode: (isMock) => set(() => ({ isMockMode: isMock })),
  setActiveMockCondition: (condition) => set(() => ({ activeMockCondition: condition })),
}));
