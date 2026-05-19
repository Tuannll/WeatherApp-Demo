import React from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { useWeatherStore, WeatherCondition } from '../hooks/useWeatherStore';
import { useQueryClient } from '@tanstack/react-query';

export default function SettingsScreen() {
  const isMockMode = useWeatherStore((s) => s.isMockMode);
  const setIsMockMode = useWeatherStore((s) => s.setIsMockMode);
  const activeMockCondition = useWeatherStore((s) => s.activeMockCondition);
  const setActiveMockCondition = useWeatherStore((s) => s.setActiveMockCondition);

  const queryClient = useQueryClient();

  const conditions: { label: string; value: WeatherCondition }[] = [
    { label: 'Trời Nắng', value: 'sunny' },
    { label: 'Trời Mưa', value: 'rainy' },
    { label: 'Trời Lạnh', value: 'cold' },
    { label: 'Nhiều Mây', value: 'cloudy' },
  ];

  // Refetch lại dữ liệu thời tiết khi đổi trạng thái để thấy kết quả ngay
  const handleToggleMock = (val: boolean) => {
    setIsMockMode(val);
    queryClient.invalidateQueries({ queryKey: ['weather'] });
  };

  const handleSelectCondition = (val: WeatherCondition) => {
    setActiveMockCondition(val);
    queryClient.invalidateQueries({ queryKey: ['weather'] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Sử dụng Dữ liệu Giả (Mock Mode)</Text>
        <Switch value={isMockMode} onValueChange={handleToggleMock} />
      </View>

      {isMockMode && (
        <View style={styles.mockOptions}>
          <Text style={styles.sectionTitle}>Chọn Điều Kiện Thời Tiết:</Text>
          <View style={styles.buttonGroup}>
            {conditions.map((cond) => (
              <View key={cond.value} style={styles.buttonWrapper}>
                <Button
                  title={cond.label}
                  color={activeMockCondition === cond.value ? '#007AFF' : '#A9A9A9'}
                  onPress={() => handleSelectCondition(cond.value)}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20
  },
  mockOptions: { 
    marginTop: 10 
  },
  buttonGroup: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  buttonWrapper: { 
    width: '48%', 
    marginBottom: 15 
  }
});
