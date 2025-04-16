import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '@/types/shift';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ 
        title: 'Not Found',
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: COLORS.blue,
      }} />
      <View style={styles.container}>
        <Text style={styles.title}>Your shift buddy</Text>
        <Text style={styles.message}>
        Your smart companion for effortless shift management.
        </Text>
        <Link href="/(tabs)/my-shifts" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to My Shifts</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.blue,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: COLORS.lightBlue,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});