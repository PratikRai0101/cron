import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View className="items-center justify-center">
      <Text
        className={`text-base ${focused ? 'text-accent' : 'text-text-secondary'}`}
      >
        {icon}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141414',
          borderTopColor: '#262626',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#737373',
      }}
    >
      <Tabs.Screen
        name="grid"
        options={{
          title: 'Grid',
          tabBarIcon: ({ focused }) => <TabIcon icon="▦" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ focused }) => <TabIcon icon="◉" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="identity"
        options={{
          title: 'Identity',
          tabBarIcon: ({ focused }) => <TabIcon icon="◇" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="☰" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
