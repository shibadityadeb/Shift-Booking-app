import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { useShiftsStore } from '@/store/shifts';
import ShiftCard from '@/components/ShiftCard';
import { GroupedShifts } from '@/types/shift';
import CityFilter from '@/components/CityFilter';

export default function AvailableShifts() {
  const { shifts, bookShift, selectedCity } = useShiftsStore();
  
  const availableShifts = shifts.filter(
    (shift) => !shift.isBooked && (!selectedCity || shift.city === selectedCity)
  );
  
  const groupedShifts = availableShifts.reduce<GroupedShifts>((acc, shift) => {
    if (!acc[shift.date]) {
      acc[shift.date] = [];
    }
    acc[shift.date].push(shift);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <CityFilter />
      <ScrollView>
        {Object.entries(groupedShifts).map(([date, shifts]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>
              {format(new Date(date), 'EEEE, MMMM d, yyyy')}
            </Text>
            {shifts.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                onBook={() => bookShift(shift.id)}
              />
            ))}
          </View>
        ))}
        {availableShifts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No available shifts{selectedCity ? ` in ${selectedCity}` : ''}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  dateGroup: {
    marginTop: 20,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
});