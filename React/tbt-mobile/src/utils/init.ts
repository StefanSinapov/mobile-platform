import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import { useRootNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

import { initAuth, initI18n } from '@/core';

export function useAppReady(): [boolean, Error | null] {
  const [initReady, initError] = useInitReady();
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...MaterialIcons.font,
  });
  const appReady = initReady && fontsLoaded;
  const error = initError ?? fontsError;

  return [appReady, error];
}

function useInitReady(): [boolean, Error | null] {
  const [initReady, setInitReady] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);

  useEffect(() => {
    async function init() {
      try {
        await initI18n();
        await initAuth();
        setInitReady(true);
      } catch (error) {
        setInitError(error as Error);
      }
    }

    init();
  }, []);

  return [initReady, initError];
}

export function useRouterReady() {
  const rootNavigation = useRootNavigation();
  const [routerReady, setRouterReady] = useState(false);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setRouterReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  return routerReady;
}
