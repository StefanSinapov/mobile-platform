import React from 'react';
import { ActivityIndicator } from 'react-native';

import { View } from '@/components/Themed';

export default function Root() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
