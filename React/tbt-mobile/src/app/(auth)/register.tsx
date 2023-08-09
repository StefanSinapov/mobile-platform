import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import { Text, ScrollView } from '@/components/Themed';

export default function RegisterView() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Register',
          headerShown: true,
          headerBackVisible: Platform.OS !== 'android',
        }}
      />
      <Text>RegisterView</Text>
    </ScrollView>
  );
}
