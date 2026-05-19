import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWeatherStore } from '../hooks/useWeatherStore';
import { RootStackNavigationProp } from '../navigation/types';

export default function FoodDetailScreen() {
  const navigation = useNavigation<RootStackNavigationProp<'FoodDetail'>>();
  // Đọc thông tin selectedFood trực tiếp từ Zustand store (không qua params)
  const selectedFood = useWeatherStore((s) => s.selectedFood);

  if (!selectedFood) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không có dữ liệu món ăn</Text>
        <Button title="Quay lại" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={selectedFood.image} style={styles.image} />
      <Text style={styles.name}>{selectedFood.name}</Text>
      <Text style={styles.description}>{selectedFood.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Quay lại Trang chủ" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 30, 
    backgroundColor: '#fff' 
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666'
  },
  image: { 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    marginBottom: 20 
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  description: { 
    fontSize: 18, 
    color: '#444', 
    textAlign: 'center', 
    lineHeight: 28 
  },
  buttonContainer: { 
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});
