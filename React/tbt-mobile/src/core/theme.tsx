import type { Theme as NavigationTheme } from '@react-navigation/native';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import { darkTheme, lightTheme, type Theme } from '@/ui/theme';
import * as storage from '@/utils/storage';

const THEME_STORAGE_KEY = '@app/theme-mode/v1';

type ThemeMode = 'light' | 'dark' | 'system';
type ThemeScheme = 'light' | 'dark';

type ContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  themeScheme: ThemeScheme;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorMode = useColorScheme();
  const [persistedThemeMode, setThemeMode] = storage.useStorage<ThemeMode>(THEME_STORAGE_KEY);

  console.log(persistedThemeMode);
  const themeMode = persistedThemeMode ?? 'system';
  let themeScheme: ThemeScheme;

  if (themeMode === 'system') {
    themeScheme = systemColorMode ?? 'light';
  } else {
    themeScheme = themeMode;
  }

  const theme = themeScheme === 'light' ? lightTheme : darkTheme;

  const navigationTheme: NavigationTheme = {
    dark: themeScheme === 'dark',
    colors: {
      card: theme.colors.background,
      background: theme.colors.background,
      border: theme.colors.border,
      text: theme.colors.text,
      primary: theme.colors.primary,
      notification: theme.colors.error,
    },
  };

  return (
    <ThemeContext.Provider value={{ themeMode, themeScheme, theme, setThemeMode }}>
      <RestyleThemeProvider theme={theme}>
        <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
      </RestyleThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Missing ColorModeProvider!');
  }
  return context;
};
