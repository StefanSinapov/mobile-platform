import React from 'react';
import { Button } from 'react-native';

import { View } from '@/components/Themed';
import { useI18n } from '@/core';
import { useAuthStore } from '@/core/auth';
// import {  Text as RestyleText, useTheme } from '@/ui';
import { useTheme, Text } from '@/ui';
// import RestyleText from '@/ui/components/text';

export default function SettingsView() {
  const authStatus = useAuthStore(state => state.status);
  const logout = useAuthStore(state => state.logout);
  const [locale, setLocale] = useI18n();
  const { themeMode, themeScheme, setThemeMode } = useTheme();

  return (
    <View>
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
      <Text>No variant</Text>
      <Text variant="header">Inside box</Text>
      <Text margin="s" color="error" fontFamily="Aria">
        Inside box
      </Text>

      {/* <Box alignContent="center" flex={1} alignItems="center" height={100}>
        <Text>Inside box</Text>
      </Box> */}
    </View>
  );
}
