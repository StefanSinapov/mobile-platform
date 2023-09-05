import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { translate } from '@/core';
import type { Theme } from '@/ui';
import { View, Text, useDefaultHeaderOptions, useTheme } from '@/ui';

export default function TabOneScreen() {
  const { theme } = useTheme();
  const screenOptions = useDefaultHeaderOptions();

  return (
    <View padding="m" flex={1}>
      <Tabs.Screen
        options={{
          ...screenOptions,
          title: translate('home.title'),
          headerRight: () => modalButton(theme),
        }}
      />
      <Text variant="l">{translate('home.title')}</Text>
    </View>
  );
}

function modalButton(theme: Theme) {
  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <View marginRight="m" opacity={pressed ? 0.5 : 1}>
            <MaterialIcons name="info" size={25} color={theme.colors.text} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}
