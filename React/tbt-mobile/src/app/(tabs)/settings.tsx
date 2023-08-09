import React from 'react';
import { Button } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useI18n } from '@/core';
import { useAuthStore } from '@/core/auth';

export default function SettingsView() {
  const authStatus = useAuthStore(state => state.status);
  const logout = useAuthStore(state => state.logout);
  const [locale, setLocale] = useI18n();

  return (
    <View>
      <Text>SettingsView</Text>
      <Text>Auth status: {authStatus}</Text>
      <Button title="Logout" onPress={() => logout()} />
      <Text>Locale: {locale.toString()}</Text>
      {locale === 'en' && <Button title="Set locale to NL" onPress={() => setLocale('nl')} />}
      {locale === 'nl' && <Button title="Set locale to EN" onPress={() => setLocale('en')} />}
    </View>
  );
}
