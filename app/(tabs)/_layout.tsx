import { Tabs } from 'expo-router';
import { COLORS } from '@/types/shift';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          borderTopColor: COLORS.mediumGray,
        },
      }}>
      <Tabs.Screen
        name="my-shifts"
        options={{
          title: 'My shifts',
          tabBarLabel: 'My shifts',
        }}
      />
      <Tabs.Screen
        name="available-shifts"
        options={{
          title: 'Available shifts',
          tabBarLabel: 'Available shifts',
        }}
      />
    </Tabs>
  );
}