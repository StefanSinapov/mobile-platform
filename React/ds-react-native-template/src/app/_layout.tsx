import { DevSettings, Platform, useColorScheme } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { sleep } from '../utils/common';
import Providers from '@/Providers';

if (__DEV__ && Platform.OS !== 'web') {
  DevSettings.addMenuItem('Open Playground', () => console.log('playground'));
  DevSettings.addMenuItem('Open Sitemap', () => console.log('sitemap'));
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

// TODO: this is temporary here
function useAppReady() {
  const appReady = true;

  const closeSplashScreen = async () => {
    await sleep(10);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (appReady) {
      closeSplashScreen();
    }
  }, [appReady]);

  return true;
}

export default function RootLayout() {
  const appReady = useAppReady();

  return (
    <Providers>
      <RootLayoutNavigator />
    </Providers>
  );
}

function RootLayoutNavigator() {
  // const screenOptions = useDefaultStackScreenOptions();
  return (
    // <Stack screenOptions={{ headerShown: false, ...screenOptions }}>
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
    </Stack>
  );
}
