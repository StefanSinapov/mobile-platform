import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import type { Theme } from '@/ui';
import { Text, View, useDefaultStackScreenOptions, useTheme } from '@/ui';

export default function PlaygroundScreen() {
  const { theme } = useTheme();

  const screenOptions = useDefaultStackScreenOptions();

  return (
    <View padding="m" flex={1}>
      <Stack.Screen
        options={{
          ...screenOptions,
          title: 'Playground',
          headerLeft: () => CloseButton(theme),
        }}
      />
      <Link href="/playground/design-system">
        <Text>Design system</Text>
      </Link>
    </View>
  );
}

const CloseButton = (theme: Theme) => {
  return (
    <Pressable>
      {({ pressed }) => (
        <View opacity={pressed ? 0.5 : 1}>
          <Link href="/settings" asChild>
            <MaterialIcons name="close" size={25} color={theme.colors.text} />
          </Link>
        </View>
      )}
    </Pressable>
  );
};
