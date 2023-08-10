import type { HeaderOptions } from '@react-navigation/elements';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { useTheme } from './theme';

import { translate } from '@/core';
export function useDefaultHeaderOptions() {
  const { theme } = useTheme();

  const headerOptions: Partial<HeaderOptions> = {
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.text,

    headerTitleStyle: {
      fontSize: theme.typography.text.xl.fontSize,
    },
  };

  return headerOptions;
}

export function useDefaultStackScreenOptions() {
  const { theme } = useTheme();
  const defaultHeaderOptions = useDefaultHeaderOptions() as NativeStackNavigationOptions;

  const screenOptions: NativeStackNavigationOptions = {
    ...defaultHeaderOptions,
    headerBackTitleStyle: {
      fontSize: theme.typography.text.xl.fontSize,
    },
    headerBackTitle: translate('common.back'),
  };

  return screenOptions;
}
