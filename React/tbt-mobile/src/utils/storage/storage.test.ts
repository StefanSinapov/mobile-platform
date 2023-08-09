import AsyncStorage from '@react-native-async-storage/async-storage';

import { load, loadString, save, saveString, clear, remove } from './storage';

// fixtures
const VALUE_OBJECT = { x: 1 };
const VALUE_STRING = JSON.stringify(VALUE_OBJECT);

// beforeEach(() => (AsyncStorage.getItem as jest.Mock).mockReturnValue(Promise.resolve(VALUE_STRING)))
afterEach(() => jest.clearAllMocks());

function mockGetItem(result: string | null) {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(Promise.resolve(result));
}

describe('loadString', () => {
  it('should return the value from storage', async () => {
    mockGetItem(VALUE_STRING);
    const result = await loadString('SOME_KEY');
    expect(result).toBe(VALUE_STRING);
  });

  it('should return null if the value is not found in storage', async () => {
    mockGetItem(null);
    const result = await loadString('SOME_KEY');
    expect(result).toBeNull();
  });

  it('should return null if there is an error loading the value from storage', async () => {
    const error = new Error('Some error occurred');
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);
    const result = await loadString('SOME_KEY');
    expect(result).toBeNull();
  });
});

describe('load', () => {
  it('should return the parsed value from storage', async () => {
    const value = { someKey: 'some value' };
    mockGetItem(JSON.stringify(value));
    const result = await load('SOME_KEY');
    expect(result).toEqual(value);
  });

  it('should return null if the value is not found in storage', async () => {
    mockGetItem(null);
    const result = await load('SOME_KEY');
    expect(result).toBeNull();
  });

  it('should return null if there is an error loading the value from storage', async () => {
    const error = new Error('Some error occurred');
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);
    const result = await load('SOME_KEY');
    expect(result).toBeNull();
  });

  it('should log an error if there is an error parsing the value from storage', async () => {
    mockGetItem('invalid json');
    const result = await load('SOME_KEY');
    expect(result).toBeNull();
  });
});

describe('saveString', () => {
  it('should save the value to storage', async () => {
    const result = await saveString('something', VALUE_STRING);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('something', VALUE_STRING);
    expect(result).toBe(true);
  });

  it('should return false if there is an error saving the value to storage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Some error occurred'));
    const result = await saveString('something', VALUE_STRING);
    expect(result).toBe(false);
  });
});

describe('save', () => {
  it('should save the parsed value to storage', async () => {
    const result = await save('something', VALUE_OBJECT);
    expect(result).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('something', VALUE_STRING);
  });

  it('should return false if there is an error saving the parsed value to storage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Some error occurred'));
    const result = await save('something', VALUE_OBJECT);
    expect(result).toBe(false);
  });
});

test('remove', async () => {
  await remove('something');
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith('something');
});

test('clear', async () => {
  await clear();
  expect(AsyncStorage.clear).toHaveBeenCalledWith();
});
