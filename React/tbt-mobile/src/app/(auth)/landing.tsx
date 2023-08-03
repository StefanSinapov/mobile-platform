import React from 'react';

import { View, Text } from '@/components/Themed';
import { Button } from 'react-native';
import { Stack, router } from 'expo-router';

export default function LandingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>LandingScreen</Text>
      <Button
        title="Login"
        onPress={() => {
          router.push('/login');
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          router.push('/register');
        }}
      />
    </View>
  );
}
