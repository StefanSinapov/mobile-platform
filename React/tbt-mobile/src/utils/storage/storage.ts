import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    if (almostThere == null) {
      return null;
    }
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export function useStorage<T extends string>(
  key: string,
): [T | null, (data: T) => Promise<T>, () => Promise<void>] {
  const [storageItem, setStorageItem] = useState<T | null>(null);

  const getStorageItem = useCallback(async () => {
    const data = (await loadString(key)) as T;
    console.log('getStorageItem', data);
    setStorageItem(data);
  }, [key]);

  async function updateStorageItem(data: T) {
    if (typeof data === 'string') {
      await saveString(key, data);
      setStorageItem(data);
    }
    return data;
  }

  async function clearStorageItem() {
    await remove(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, [getStorageItem]);

  return [storageItem, updateStorageItem, clearStorageItem];
}
