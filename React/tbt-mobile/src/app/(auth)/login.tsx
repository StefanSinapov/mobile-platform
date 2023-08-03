import { Text, ScrollView, View } from '@/components/Themed';
import { useAuthStore } from '@/core/auth';
import { Stack } from 'expo-router';
import { Button } from 'react-native';

export default function LoginView() {
  const login = useAuthStore(state => state.login);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{ title: 'Login', headerShown: true }} />
      <Text>LoginView</Text>
      <Button title="Login" onPress={() => login({ email: 'some@email.com', password: '123' })} />
    </View>
  );
}
