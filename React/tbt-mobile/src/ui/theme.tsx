import type { Theme as NavigationTheme } from '@react-navigation/native';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider as RestyleThemeProvider, createTheme } from '@shopify/restyle';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import * as storage from '@/utils/storage';

const colors = {
  darkGunmetal: '#1A1A31',
  phthaloGreen: '#112B30',
  japaneseIndigo: '#1B4650',
  japaneseIndigoMedium: '#C3D1D3',
  dimGrey: '#5F706A',
  whiteCoffee: '#E4DCD5',
  limonGreen: '#DCFEBC',
  limonGreenLight: '#F5FFEB',
  vodka: '#C2B7ED',
  vodkaMedium: '#DFDAF2',
  vodkaLight: '#F5F4FB',
  littleGirlPink: '#F4B8D1',
  red: '#D81D1D',
  lightRed: '#FFD6D6',
  green: '#428776',
  black: '#0B0B0B',
  white: '#F0F2F3',
};

const lightTheme = createTheme({
  spacing: {
    0: 0,
    px: 1,
    0.5: 2,
    1: 4,
  },
  borderRadii: {
    '2': 2,
    '4': 4,
    '8': 8,
    '10': 10,
    '20': 20,
  },
  zIndices: {
    '0': 0,
  },
  colors: {
    background: colors.white,
    text: colors.darkGunmetal,
    border: colors.japaneseIndigoMedium,
    error: colors.red,
    success: colors.green,
    primary: colors.limonGreen,
  },
});

export type Theme = typeof lightTheme;

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: colors.black,
    text: colors.white,
    border: colors.japaneseIndigoMedium,
  },
};

export { lightTheme, darkTheme };

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
