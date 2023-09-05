import { StatusBar } from 'expo-status-bar';
import React, { Platform } from 'react-native';

import { View, Text } from '@/ui';

export default function ModalScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text variant="l">Modal</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} animated={true} />
    </View>
  );
}
