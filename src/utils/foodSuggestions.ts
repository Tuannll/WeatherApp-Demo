import { ImageSourcePropType } from 'react-native';
import type { MockWeatherItem } from '../mock/mockWeatherData';

// ─── Types ──────────────────────────────────────────────────────────

export interface FoodItem {
  name: string;
  image: ImageSourcePropType;
  description: string;
}

export interface FoodSuggestionResult {
  condition: string;
  temperature: number;
  reason: string;
  foods: FoodItem[];
}

// ─── Food Data ──────────────────────────────────────────────────────

/** Nhóm 1: Trời nắng nóng > 28°C */
const SUNNY_HOT_FOODS: FoodItem[] = [
  {
    name: 'Gỏi cuốn tôm thịt',
    image: require('../../assets/foods/goi_cuon_tom_thit.jpg'),
    description: 'Cuốn tươi mát với tôm, thịt, bún và rau sống.',
  },
  {
    name: 'Chè đá xanh',
    image: require('../../assets/foods/che_da_xanh.jpg'),
    description: 'Chè đậu xanh mát lạnh, giải nhiệt ngày nắng.',
  },
  {
    name: 'Bún bò Huế',
    image: require('../../assets/foods/bun_bo_hue.jpg'),
    description: 'Bún bò cay nồng, ăn kèm rau sống mát.',
  },
  {
    name: 'Sinh tố bơ',
    image: require('../../assets/foods/sinh_to_bo.jpg'),
    description: 'Sinh tố bơ béo ngậy, bổ dưỡng và mát lạnh.',
  },
];

/** Nhóm 2: Trời mưa / Ẩm */
const RAINY_FOODS: FoodItem[] = [
  {
    name: 'Phở bò tái chín',
    image: require('../../assets/foods/pho_bo_tai_chin.jpg'),
    description: 'Phở nóng hổi với thịt bò tái chín, nước dùng đậm đà.',
  },
  {
    name: 'Bánh mì nóng',
    image: require('../../assets/foods/banh_mi_nong.jpg'),
    description: 'Bánh mì giòn tan, nóng hổi vừa thổi vừa ăn.',
  },
  {
    name: 'Cháo gà',
    image: require('../../assets/foods/chao_ga.jpg'),
    description: 'Cháo gà nóng hổi, bồi bổ cơ thể ngày mưa.',
  },
  {
    name: 'Mì Quảng',
    image: require('../../assets/foods/mi_quang.jpg'),
    description: 'Mì Quảng đậm đà với nước lèo sệt, sợi mì vàng óng.',
  },
];

/** Nhóm 3: Trời lạnh < 18°C */
const COLD_FOODS: FoodItem[] = [
  {
    name: 'Lẩu Thái hải sản',
    image: require('../../assets/foods/lau_thai_hai_san.jpg'),
    description: 'Lẩu chua cay nồng nàn, ấm bụng ngày lạnh.',
  },
  {
    name: 'Súp bí đỏ',
    image: require('../../assets/foods/sup_bi_do.jpg'),
    description: 'Súp kem bí đỏ sánh mịn, giàu dinh dưỡng.',
  },
  {
    name: 'Bánh bao nhân thịt',
    image: require('../../assets/foods/banh_bao_nhan_thit.jpg'),
    description: 'Bánh bao trắng ngần, nhân thịt trứng muối nóng hổi.',
  },
  {
    name: 'Trà gừng mật ong',
    image: require('../../assets/foods/tra_gung_mat_ong.jpg'),
    description: 'Trà gừng ấm nóng, xua tan cái lạnh.',
  },
];

/** Nhóm 4: Thời tiết trung bình / Nhiều mây */
const CLOUDY_FOODS: FoodItem[] = [
  {
    name: 'Cơm tấm sườn bì chả',
    image: require('../../assets/foods/com_tam_suon_bi_cha.jpg'),
    description: 'Cơm tấm truyền thống với sườn nướng thơm lừng.',
  },
  {
    name: 'Bún chả Hà Nội',
    image: require('../../assets/foods/bun_cha_hn.jpg'),
    description: 'Bún chả thơm lừng với nước mắm chua ngọt.',
  },
  {
    name: 'Bánh xèo miền Trung',
    image: require('../../assets/foods/banh_xeo_mien_trung.jpg'),
    description: 'Bánh xèo giòn rụm, đúc theo kiểu miền Trung.',
  },
  {
    name: 'Nước mía',
    image: require('../../assets/foods/nuoc_mia.jpg'),
    description: 'Nước mía tươi mát, giải khát nhẹ nhàng.',
  },
];

// ─── Main Function ──────────────────────────────────────────────────

/**
 * Gợi ý món ăn dựa trên điều kiện thời tiết và nhiệt độ.
 * - Sunny + temp > 28°C -> Món mát, giải nhiệt.
 * - Rainy -> Món nóng, ấm bụng.
 * - Cold (hoặc < 18°C) -> Lẩu, đồ nóng.
 * - Cloudy / Trung bình -> Món ăn phổ biến (Cơm tấm, bún chả...).
 */
export function getFoodSuggestions(
  weather: Pick<MockWeatherItem, 'condition' | 'temperature'>
): FoodSuggestionResult {
  const { condition, temperature } = weather;

  // Xử lý trời nắng nóng
  if (condition === 'sunny' && temperature > 28) {
    return {
      condition,
      temperature,
      reason: `Trời nắng nóng ${temperature}°C — gợi ý món mát, giải nhiệt.`,
      foods: SUNNY_HOT_FOODS,
    };
  }

  // Xử lý trời mưa
  if (condition === 'rainy') {
    return {
      condition,
      temperature,
      reason: `Trời mưa ${temperature}°C — gợi ý món nóng, ấm bụng.`,
      foods: RAINY_FOODS,
    };
  }

  // Xử lý trời lạnh (dựa vào condition hoặc nhiệt độ)
  if (condition === 'cold' || temperature < 18) {
    return {
      condition,
      temperature,
      reason: `Trời lạnh ${temperature}°C — gợi ý lẩu, nướng và đồ nóng.`,
      foods: COLD_FOODS,
    };
  }

  // Mặc định cho trường hợp "Trung bình / Nhiều mây" hoặc nắng nhưng <= 28 độ
  return {
    condition,
    temperature,
    reason: `Thời tiết ôn hòa ${temperature}°C — gợi ý món ăn phổ biến.`,
    foods: CLOUDY_FOODS,
  };
}

/**
 * Lấy tất cả danh mục gợi ý món ăn (dùng cho debug hoặc hiển thị toàn bộ).
 */
export function getAllFoodCategories(): Record<string, FoodItem[]> {
  return {
    'Nắng nóng (>28°C)': SUNNY_HOT_FOODS,
    'Trời mưa': RAINY_FOODS,
    'Trời lạnh (<18°C)': COLD_FOODS,
    'Nhiều mây / Trung bình': CLOUDY_FOODS,
  };
}