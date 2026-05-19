/**
 * Environment Configuration
 *
 * Đọc cấu hình từ file .env thông qua Expo.
 * Expo tự động load các biến có prefix EXPO_PUBLIC_ và expose qua
 * process.env (không cần thêm thư viện dotenv).
 *
 * @see https://docs.expo.dev/guides/environment-variables/
 */

export const ENV = {
  /**
   * Khi `true`, ứng dụng sẽ sử dụng dữ liệu mock thay vì gọi API thực.
   * Giá trị được đọc từ biến EXPO_PUBLIC_USE_MOCK trong file .env
   */
  USE_MOCK: process.env.EXPO_PUBLIC_USE_MOCK === 'true',
} as const;
