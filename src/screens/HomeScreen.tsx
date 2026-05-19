import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWeatherQuery } from '../hooks/useWeatherQuery';
import { useWeatherStore } from '../hooks/useWeatherStore';
import { getFoodSuggestions, FoodItem } from '../utils/foodSuggestions';
import { RootStackNavigationProp } from '../navigation/types';
import { requestLocationPermission } from '../utils/locationPermission';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProp<'Home'>>();
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(true);

  const { data, isLoading, isError, refetch } = useWeatherQuery(lat, lon);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setSelectedFood = useWeatherStore((s) => s.setSelectedFood);

  useEffect(() => {
    (async () => {
      setIsLocating(true);
      const permission = await requestLocationPermission();
      if (permission.granted) {
        try {
          const location = await Location.getCurrentPositionAsync({});
          setLat(location.coords.latitude);
          setLon(location.coords.longitude);
        } catch (err) {
          // Fallback nếu có lỗi
          setLat(21.0285);
          setLon(105.8542);
        }
      } else {
        // Mặc định Hà Nội nếu từ chối
        setLat(21.0285);
        setLon(105.8542);
      }
      setIsLocating(false);
    })();
  }, []);

  // Lắng nghe khi query có data thì gọi setWeather
  useEffect(() => {
    if (data) {
      setWeather(data);
    }
  }, [data, setWeather]);

  const handleFoodPress = (food: FoodItem) => {
    setSelectedFood(food);
    navigation.navigate('FoodDetail');
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleFoodPress(item)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Button title="Cài đặt Mock Mode" onPress={() => navigation.navigate('Settings')} />
      </View>

      {(isLoading || isLocating) && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {isError && !isLoading && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Lỗi khi tải dữ liệu thời tiết</Text>
          <Button title="Thử lại" onPress={() => refetch()} />
        </View>
      )}

      {data && !isLoading && !isLocating && (
        <>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherTitle}>Thời tiết hiện tại</Text>
            <Text style={styles.weatherIcon}>{data.icon}</Text>
            <Text style={styles.weatherTemp}>{data.temperature}°C - {data.label}</Text>
            <Text style={styles.weatherDesc}>{data.description}</Text>
            <Text style={styles.weatherDetails}>Độ ẩm: {data.humidity}% | Gió: {data.windSpeed} km/h</Text>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Gợi ý món ăn</Text>
            <FlatList
              data={getFoodSuggestions(data).foods}
              keyExtractor={(item) => item.name}
              renderItem={renderFoodItem}
              contentContainerStyle={styles.list}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerButtons: { padding: 10, backgroundColor: '#fff', elevation: 2 },
  loader: { marginTop: 20 },
  center: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  errorText: { color: 'red', marginBottom: 10 },
  weatherContainer: { padding: 20, alignItems: 'center', backgroundColor: '#fff', marginBottom: 10, elevation: 1 },
  weatherTitle: { fontSize: 18, fontWeight: 'bold' },
  weatherIcon: { fontSize: 60, marginVertical: 10 },
  weatherTemp: { fontSize: 24, fontWeight: 'bold' },
  weatherDesc: { color: '#666', marginTop: 5, fontSize: 16 },
  weatherDetails: { color: '#444', marginTop: 5 },
  listContainer: { flex: 1 },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  foodName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  foodDesc: { color: '#666' },
});
