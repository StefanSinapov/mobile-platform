import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

import { View, Text } from '@/ui';

export default function LandingScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
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
