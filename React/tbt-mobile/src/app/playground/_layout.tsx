import { Stack } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

import { useDefaultStackScreenOptions, useTheme } from '@/ui';

export default function _layout() {
  const { setThemeMode, themeScheme } = useTheme();

  const screenOptions = useDefaultStackScreenOptions();
  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        headerRight: () => (
          // TODO: Change with custom button
          <Button
            onPress={() => {
              setThemeMode(themeScheme === 'light' ? 'dark' : 'light');
            }}
            title={themeScheme === 'light' ? 'Dark' : 'Light'}
          />
        ),
      }}
    />
  );
}
