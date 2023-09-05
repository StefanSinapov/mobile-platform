import { SplashScreen, Stack, router, useSegments, usePathname } from 'expo-router';
import { useEffect } from 'react';

import Providers from '@/Providers';
import { useAuthStore } from '@/core/auth';
import { useDefaultStackScreenOptions } from '@/ui';
import { useAppReady, useRouterReady } from '@/utils/init';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
//   playground: {
//     initialRouteName: 'index',
//   },
// };

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
      setTimeout(() => SplashScreen.hideAsync(), 300);
    }
  }, [loaded]);

  useRouteProtection();

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

function RootLayoutNav() {
  const screenOptions = useDefaultStackScreenOptions();
  return (
    <Stack screenOptions={{ ...screenOptions, headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
    </Stack>
  );
}

function useRouteProtection() {
  const pathName = usePathname();
  const segments = useSegments();
  const authStatus = useAuthStore(s => s.status);
  const notInAuthRoute = segments[0] !== '(auth)';
  const isNavigationReady = useRouterReady();
  const isRoot = pathName === '/';
  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }

    if (authStatus === 'unauthenticated' && notInAuthRoute) {
      console.debug('/(auth)/landing');
      router.replace('/(auth)/landing');
    } else if (authStatus === 'authenticated' && (!notInAuthRoute || isRoot)) {
      console.debug('/(tabs)/home');
      router.push('/(tabs)/home');
    }
  }, [isNavigationReady, authStatus, notInAuthRoute, isRoot]);
}
