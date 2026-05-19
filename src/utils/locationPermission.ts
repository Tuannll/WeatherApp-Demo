/**
 * Location Permission Utility
 *
 * Xin cấp quyền vị trí foreground bằng expo-location.
 * Nếu quyền bị từ chối, hiển thị Alert điều hướng người dùng vào Settings.
 *
 * @see https://docs.expo.dev/versions/latest/sdk/location/
 */

import { Alert, Linking, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Device from 'expo-device';

// ─── Types ──────────────────────────────────────────────────────────

export interface LocationPermissionResult {
  /** Quyền đã được cấp hay chưa */
  granted: boolean;
  /** Thông báo lỗi (nếu có) */
  errorMessage?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Mở ứng dụng Settings của thiết bị để người dùng cấp quyền thủ công.
 *
 * - iOS: mở trực tiếp trang cài đặt của app (`app-settings:`)
 * - Android: mở trang cài đặt ứng dụng
 */
function openAppSettings(): void {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
}

/**
 * Hiển thị Alert thông báo quyền bị từ chối và gợi ý mở Settings.
 */
function showPermissionDeniedAlert(): void {
  Alert.alert(
    'Quyền vị trí bị từ chối',
    'Ứng dụng cần quyền truy cập vị trí để hiển thị thời tiết chính xác. ' +
      'Vui lòng vào Cài đặt và bật quyền vị trí cho ứng dụng.',
    [
      {
        text: 'Để sau',
        style: 'cancel',
      },
      {
        text: 'Mở Cài đặt',
        onPress: openAppSettings,
      },
    ],
    { cancelable: true }
  );
}

// ─── Main Function ──────────────────────────────────────────────────

/**
 * Xin cấp quyền vị trí foreground.
 *
 * Flow:
 * 1. Kiểm tra thiết bị thực (Android Emulator không hỗ trợ trên Snack).
 * 2. Gọi `Location.requestForegroundPermissionsAsync()`.
 * 3. Nếu `status === 'granted'` → trả về `{ granted: true }`.
 * 4. Nếu bị từ chối → hiển thị Alert với nút "Mở Cài đặt" và trả về `{ granted: false }`.
 *
 * @returns Promise<LocationPermissionResult>
 *
 * @example
 * ```tsx
 * const { granted } = await requestLocationPermission();
 * if (granted) {
 *   const location = await Location.getCurrentPositionAsync({});
 *   console.log(location);
 * }
 * ```
 */
export async function requestLocationPermission(): Promise<LocationPermissionResult> {
  // Kiểm tra Android Emulator (không phải thiết bị thực)
  if (Platform.OS === 'android' && !Device.isDevice) {
    const errorMessage =
      'Quyền vị trí không hoạt động trên Android Emulator. Hãy thử trên thiết bị thật.';

    Alert.alert('Không hỗ trợ', errorMessage);

    return { granted: false, errorMessage };
  }

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      return { granted: true };
    }

    // Quyền bị từ chối → hiển thị alert điều hướng vào Settings
    showPermissionDeniedAlert();

    return {
      granted: false,
      errorMessage: 'Quyền truy cập vị trí đã bị từ chối.',
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Đã xảy ra lỗi khi xin cấp quyền vị trí.';

    return { granted: false, errorMessage };
  }
}

/**
 * Kiểm tra quyền vị trí hiện tại (không hiển thị prompt).
 *
 * Dùng khi muốn kiểm tra trạng thái quyền mà không hỏi lại người dùng.
 *
 * @returns Promise<LocationPermissionResult>
 */
export async function checkLocationPermission(): Promise<LocationPermissionResult> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();

    return {
      granted: status === 'granted',
      errorMessage:
        status !== 'granted'
          ? 'Quyền truy cập vị trí chưa được cấp.'
          : undefined,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Đã xảy ra lỗi khi kiểm tra quyền vị trí.';

    return { granted: false, errorMessage };
  }
}
