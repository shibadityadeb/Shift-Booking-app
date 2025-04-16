import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Shift, COLORS } from '@/types/shift';

interface ShiftCardProps {
  shift: Shift;
  onBook?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ShiftCard({ shift, onBook, onCancel, isLoading }: ShiftCardProps) {
  const getActionButton = () => {
    if (shift.isStarted) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled>
          <Text style={styles.buttonTextDisabled}>Cancel</Text>
        </TouchableOpacity>
      );
    }

    if (shift.isOverlapping) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled>
          <Text style={styles.buttonTextDisabled}>Book</Text>
        </TouchableOpacity>
      );
    }

    if (isLoading) {
      return (
        <TouchableOpacity style={styles.button} disabled>
          <ActivityIndicator color={COLORS.white} />
        </TouchableOpacity>
      );
    }

    if (shift.isBooked) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={[styles.button, styles.buttonBook]} onPress={onBook}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{shift.startTime}-{shift.endTime}</Text>
        {shift.isOverlapping && (
          <Text style={styles.overlapping}>Overlapping</Text>
        )}
        {shift.isBooked && (
          <Text style={styles.booked}>Booked</Text>
        )}
      </View>
      {getActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    color: COLORS.lightBlue,
    marginBottom: 4,
  },
  overlapping: {
    fontSize: 14,
    color: COLORS.red,
  },
  booked: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonBook: {
    backgroundColor: COLORS.green,
  },
  buttonCancel: {
    backgroundColor: COLORS.red,
  },
  buttonDisabled: {
    backgroundColor: COLORS.mediumGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: COLORS.darkGray,
    fontSize: 14,
    fontWeight: '600',
  },
});