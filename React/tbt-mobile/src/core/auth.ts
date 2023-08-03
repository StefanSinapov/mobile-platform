import { Alert } from 'react-native';
import { create } from 'zustand';

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
      // persistAuthTokens(tokens);
      set({ tokens, status: 'authenticated' });
    } catch (error) {
      set({ status: 'unauthenticated' });
      throw error; // rethrow so caller can handle it
    }
  },
  login: async credentials => {
    set({ status: 'logging-in' });

    try {
      const tokens = await fakeLogin(credentials);
      // persistAuthTokens(tokens);
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
    // TODO: clear storage
    // storage.clearAll();
  },
}));

export const useAuthStore = authStore;

// function persistAuthTokens({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string;
//   refreshToken: string;
// }) {
//   storage.clearAll();
//   storage.set('@app/access-token', accessToken);
//   storage.set('@app/refresh-token', refreshToken);
// }

export async function initAuth() {
  authStore.setState({ status: 'determining' });

  try {
    // const accessToken = storage.getString('@app/access-token');
    const accessToken = null;

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
