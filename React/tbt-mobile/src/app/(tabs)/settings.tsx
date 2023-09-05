import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Button, Pressable } from 'react-native';

import { translate, useI18n } from '@/core';
import { useAuthStore } from '@/core/auth';
import type { Theme } from '@/ui';
import { useTheme, Text, useDefaultHeaderOptions, View } from '@/ui';

export default function SettingsView() {
  const authStatus = useAuthStore(state => state.status);
  const logout = useAuthStore(state => state.logout);
  const [locale, setLocale] = useI18n();
  const { theme, themeMode, themeScheme, setThemeMode } = useTheme();
  const screenOptions = useDefaultHeaderOptions();

  return (
    <View padding="s">
      <Tabs.Screen
        options={{
          ...screenOptions,
          title: translate('settings.title'),
          headerRight: () => PlaygroundButton(theme),
        }}
      />
      <Text>SettingsView</Text>
      <Text>Auth status: {authStatus}</Text>
      <Button title="Logout" onPress={() => logout()} />
      <Text>Locale: {locale.toString()}</Text>
      {locale === 'en' && <Button title="Set locale to NL" onPress={() => setLocale('nl')} />}
      {locale === 'nl' && <Button title="Set locale to EN" onPress={() => setLocale('en')} />}

      <Text>Theme mode: {themeMode}</Text>
      <Text>Theme scheme: {themeScheme}</Text>
      <Button title="Set theme mode to light" onPress={() => setThemeMode('light')} />
      <Button title="Set theme mode to dark" onPress={() => setThemeMode('dark')} />
      <Button title="Set theme mode to system" onPress={() => setThemeMode('system')} />
    </View>
  );
}

const PlaygroundButton = (theme: Theme) => {
  return (
    <Pressable>
      {({ pressed }) => (
        <View marginRight="m" opacity={pressed ? 0.5 : 1}>
          <Link href="/playground/" asChild>
            <MaterialIcons name="code" size={25} color={theme.colors.text} />
          </Link>
        </View>
      )}
    </Pressable>
  );
};
