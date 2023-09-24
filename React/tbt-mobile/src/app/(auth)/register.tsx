import { Stack } from 'expo-router';
import { Platform, ScrollView } from 'react-native';

import { Text } from '@/ui';

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
