import { createTheme } from '@shopify/restyle';

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
