import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import Providers from '@/Providers';
import { useAuthStore } from '@/core/auth';
import { useAppReady, useRouterReady } from '@/utils/init';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useAppReady();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useRouteProtection();

  console.log('loaded', loaded);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
      {/* <StatusBar style="auto" /> */}
    </Providers>
  );
}

function RootLayoutNav() {
  // const screenOptions = useDefaultStackScreenOptions();
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)/home">
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="(auth)" /> */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}

function useRouteProtection() {
  const segments = useSegments();
  const authStatus = useAuthStore(s => s.status);
  const notInAuthRoute = segments[0] !== '(auth)';
  const isNavigationReady = useRouterReady();
  console.log('useRouteProtection', authStatus, notInAuthRoute, isNavigationReady);
  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (authStatus === 'unauthenticated' && notInAuthRoute) {
      console.log('/(auth)/landing');
      router.replace('/(auth)/landing');
    } else if (authStatus === 'authenticated') {
      console.log('/(tabs)/home');
      router.push('/(tabs)/home');
    }
  }, [isNavigationReady, authStatus, notInAuthRoute]);
}
