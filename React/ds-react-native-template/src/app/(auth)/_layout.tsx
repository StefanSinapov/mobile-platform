import { Stack } from 'expo-router';
// import { useDefaultStackScreenOptions } from '@utils/navigation'; TODO:

export default function AuthLayout() {
  // const screenOptions = useDefaultStackScreenOptions();

  return (
    // <Stack screenOptions={screenOptions} initialRouteName="landing">
    <Stack initialRouteName="landing">
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: `Login` }} />
      <Stack.Screen name="register" options={{ title: `register` }} />
    </Stack>
  );
}
