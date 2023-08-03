import { Stack } from 'expo-router';
// import { useDefaultStackScreenOptions } from '~utils/navigation';

export default function AuthLayout() {
  // const defaultStackOptions = useDefaultStackScreenOptions();

  const screenOptions = {
    // ...defaultStackOptions,
  };

  return (
    <Stack screenOptions={screenOptions} initialRouteName="landing">
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Signup' }} />
    </Stack>
  );
}
