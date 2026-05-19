# TH2 Weather Food App

Ung dung React Native/Expo goi y mon an dua tren thoi tiet hien tai. App lay vi tri nguoi dung, goi OpenWeatherMap de hien thi thoi tiet, sau do de xuat danh sach mon an phu hop voi dieu kien nang, mua, lanh hoac nhieu may.

## Tinh nang

- Lay vi tri hien tai bang `expo-location`.
- Hien thi nhiet do, trang thai thoi tiet, do am va toc do gio.
- Goi y mon an theo dieu kien thoi tiet.
- Xem chi tiet mon an duoc chon.
- Mock Mode de thu nhanh cac kich ban thoi tiet: nang, mua, lanh, nhieu may.
- Quan ly server state bang TanStack Query va app state bang Zustand.

## Cong nghe su dung

- Expo 54
- React Native 0.81
- React 19
- TypeScript
- React Navigation
- TanStack Query
- Zustand
- Axios

## Cai dat

```bash
npm install
```

## Cau hinh moi truong

Tao file `.env` o thu muc goc du an:

```env
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
EXPO_PUBLIC_USE_MOCK=false
```

Ghi chu:

- `EXPO_PUBLIC_OPENWEATHER_API_KEY`: API key lay tu OpenWeatherMap.
- `EXPO_PUBLIC_USE_MOCK=true`: bat che do mock mac dinh khi khoi dong app.
- Neu khong cap quyen vi tri, app se dung toa do mac dinh cua Ha Noi.

## Chay ung dung

```bash
npm start
```

Chay tren Android:

```bash
npm run android
```

Chay tren iOS:

```bash
npm run ios
```

Chay tren web:

```bash
npm run web
```

## Cau truc thu muc

```text
src/
  api/          Cau hinh Axios client
  config/       Cau hinh bien moi truong
  hooks/        React Query va Zustand store
  mock/         Du lieu thoi tiet gia lap
  navigation/   Kieu du lieu dieu huong
  screens/      Cac man hinh cua ung dung
  utils/        Xu ly quyen vi tri va goi y mon an
assets/
  foods/        Hinh anh mon an
```

## Man hinh chinh

- `Home`: hien thi thoi tiet hien tai va danh sach mon an goi y.
- `FoodDetail`: hien thi thong tin chi tiet cua mon an.
- `Settings`: bat/tat Mock Mode va chon dieu kien thoi tiet gia lap.

## Luu y phat trien

- Expo chi expose bien moi truong co prefix `EXPO_PUBLIC_`.
- Khi doi Mock Mode hoac dieu kien mock, app se invalidate query `weather` de refetch du lieu.
- API thoi tiet su dung don vi metric va ngon ngu tieng Viet.
