import { Alert } from 'react-native';
import { create } from 'zustand';
import * as storage from '@/utils/storage';


const TOKENS_STORAGE_KEY = '@app/access-token/v1';

type AuthStatus =
  | 'undetermined'
  | 'determining'
  | 'logging-in'
  | 'registering'
  | 'authenticated'
  | 'unauthenticated';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

type AuthState = {
  status: AuthStatus;
  tokens: AuthTokens | null;
  setStatus: (status: AuthStatus) => void;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const authStore = create<AuthState>(set => ({
  tokens: null,
  status: 'undetermined',
  setStatus: status => set({ status }),
  register: async credentials => {
    set({ status: 'registering' });

    try {
      const tokens = await fakeSignup(credentials);
      await persistAuthTokens(tokens);
      set({ tokens, status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  login: async credentials => {
    set({ status: 'logging-in' });

    console.log('logging-in');
    try {
      const tokens = await fakeLogin(credentials);
      await persistAuthTokens(tokens);
      set({ tokens, status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  logout: async () => {
    set({ status: 'unauthenticated', tokens: null });
    try {
      await fakeLogout();
    } catch (error) {
      console.log(error);
    }

    // TODO: clear API client cache
    await storage.remove(TOKENS_STORAGE_KEY);
  },
}));

export const useAuthStore = authStore;

export async function initAuth() {
  authStore.setState({ status: 'determining' });

  try {
    const accessToken = await storage.load(TOKENS_STORAGE_KEY) as AuthTokens;

    if (!accessToken) {
      throw Error('No access token!');
    }

    // Check that the token is valid
    await fakeCheckAuth();

    // In all other cases keep user logged in if the error is not auth error
    // since they might be able to resolve it by eg. connecting to the internet etc.
    authStore.setState({ status: 'authenticated' });
  } catch (error: any) {
    if (isAuthError(error)) {
      // Ignore auth errors here since they are handled in the GraphQL client
      // where the user will be logged out automatically
      console.log('> Auth error detected during auth check', error);
    } else if (error?.networkError) {
      Alert.alert(
        'Could not connect to server',
        'Please check your internet connection and try again.'
      ); // TODO: i18n
    } else {
      console.log('> Unknown auth error', error);
      // Logout the user in case of unknown errors or if the access token is missing
      authStore.getState().logout();
    }
  }
}

export function isAuthError(error: any) {
  return fakeIsAuthError(error);
}

async function persistAuthTokens(tokens: AuthTokens) {
  return await storage.save(TOKENS_STORAGE_KEY, tokens);
}


// Mock login functions --------------------------------------------------------

function fakeLogin(
  _credentials: LoginCredentials
): Promise<{ accessToken: string; refreshToken: string }> {
  return new Promise(resolve =>
    setTimeout(() => resolve({ accessToken: '1234', refreshToken: '1234' }), 1000)
  );
}

function fakeLogout(): Promise<{ ok: boolean }> {
  return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 1000));
}

function fakeSignup(
  _credentials: RegisterCredentials
): Promise<{ accessToken: string; refreshToken: string }> {
  return new Promise(resolve =>
    setTimeout(() => resolve({ accessToken: '1234', refreshToken: '1234' }), 1000)
  );
}

function fakeCheckAuth() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

function fakeIsAuthError(error: any) {
  return [401, 403].includes(error?.errorCode);
}
