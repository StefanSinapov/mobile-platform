import React from 'react';
import { ActivityIndicator } from 'react-native';

import { View } from '@/ui';

export default function Root() {
  return (
    <View flex={1} justifyContent="center">
      <ActivityIndicator size="large" />
    </View>
  );
}
