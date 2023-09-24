import { Stack } from 'expo-router';
import { Button } from 'react-native';

import { useAuthStore } from '@/core/auth';
import { View, Text } from '@/ui';

export default function LoginView() {
  const login = useAuthStore(state => state.login);

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Stack.Screen options={{ title: 'Login', headerShown: true }} />
      <Text>LoginView</Text>
      <Button
        title="Login"
        onPress={async () => await login({ email: 'some@email.com', password: '123' })}
      />
    </View>
  );
}
