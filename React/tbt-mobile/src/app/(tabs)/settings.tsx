import React from 'react';

import { Text, View } from '@/components/Themed';
import { useAuthStore } from '@/core/auth';
import { Button } from 'react-native';

export default function SettingsView() {
  var authStatus = useAuthStore(state => state.status);
  var logout = useAuthStore(state => state.logout);

  return (
    <View>
      <Text>SettingsView</Text>
      <Text>Auth status: {authStatus}</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}
