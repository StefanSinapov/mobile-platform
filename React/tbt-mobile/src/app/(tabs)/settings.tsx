import React from 'react';

import { Text, View } from '@/components/Themed';
import { useAuthStore } from '@/core/auth';
import { Button } from 'react-native';
import { useI18n } from '@/core';

export default function SettingsView() {
  var authStatus = useAuthStore(state => state.status);
  var logout = useAuthStore(state => state.logout);
  var [locale, setLocale] = useI18n();

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
