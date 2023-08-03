type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

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
  _credentials: SignupCredentials
): Promise<{ accessToken: string; refreshToken: string }> {
  return new Promise(resolve =>
    setTimeout(() => resolve({ accessToken: '1234', refreshToken: '1234' }), 1000)
  );
}

function fakeCheckAuth() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
