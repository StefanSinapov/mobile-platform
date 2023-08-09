import { locale } from 'expo-localization';
import i18n from 'i18next';
import type TranslateOptions from 'i18next';
import { useCallback, useState } from 'react';
import { initReactI18next } from 'react-i18next';
// import { I18nManager } from 'react-native';

import type { Keywords } from '@/translations/en';
import en from '@/translations/en';
import nl from '@/translations/nl';
import * as storage from '@/utils/storage';

const LOCALE_STORAGE_KEY = '@app/locale_v1';

export const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
};

export type Language = keyof typeof resources;

export async function initI18n() {
  const persistedLocale = await getPersistedLocale();
  i18n.use(initReactI18next).init({
    resources,
    debug: __DEV__,
    lng: persistedLocale || locale.split('-')[0],
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // By default React Native projects does not support Intl

    // allows integrating dynamic values into translations.
    interpolation: {
      escapeValue: false, // escape passed in values to avoid XSS injections
    },
  });
}

// Is it a RTL language?
// export const isRTL: boolean = i18n.dir() === 'rtl';

// I18nManager.allowRTL(isRTL);
// I18nManager.forceRTL(isRTL);

export function useI18n(): [string, (language: Language) => void] {
  const [internalLocale, setLocaleInternal] = useState(i18n.language);

  const setLocale = useCallback(
    (language: Language) => {
      i18n.changeLanguage(language);
      setPersistedLocale(language);
      setLocaleInternal(language);
    },
    [setLocaleInternal],
  );

  return [internalLocale, setLocale];
}

async function getPersistedLocale() {
  return (await storage.loadString(LOCALE_STORAGE_KEY)) as Language;
}

async function setPersistedLocale(l: string) {
  await storage.saveString(LOCALE_STORAGE_KEY, l);
}

export type TxKeyPath = DeepLeafKeys<Keywords>;
export function translate(key: TxKeyPath, options?: typeof TranslateOptions): string {
  return i18n.t(key, options);
}

// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript
// get all possible key paths
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: `${K & string}` | Concat<K & string, DeepKeys<T[K]>>;
    }[keyof T]
  : '';

// or: only get leaf and no intermediate key path
type DeepLeafKeys<T> = T extends object
  ? { [K in keyof T]-?: Concat<K & string, DeepKeys<T[K]>> }[keyof T]
  : '';

type Concat<K extends string, P extends string> = `${K}${'' extends P ? '' : '.'}${P}`;
