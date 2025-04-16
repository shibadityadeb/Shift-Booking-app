import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useShiftsStore } from '@/store/shifts';
import { COLORS } from '@/types/shift';

export default function CityFilter() {
  const { shifts, selectedCity, setSelectedCity } = useShiftsStore();
  
  const cities = Array.from(new Set(shifts.map((shift) => shift.city)));
  const getCityCount = (city: string) => 
    shifts.filter(s => s.city === city && !s.isBooked).length;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {cities.map((city) => {
          const count = getCityCount(city);
          const isSelected = selectedCity === city;
          return (
            <TouchableOpacity
              key={city}
              style={[
                styles.filterButton,
                isSelected && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCity(city)}>
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextActive,
                ]}>
                {`${city} (${count})`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  filterTextActive: {
    color: COLORS.blue,
    fontWeight: '600',
  },
});