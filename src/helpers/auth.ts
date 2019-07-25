import storage from 'helpers/storage';

export const ACCESS_TOKEN = 'accessToken';
export const EXPIRES_IN = 'expiresIn';
export const INVALID_SESSION =
  'You are not logged in, or your session has expired! Please login';

export const setAuthToken = (token: string) =>
  storage.setItem(ACCESS_TOKEN, token);

export const setExpiryTime = (expiresIn: string) => {
  storage.setItem(
    EXPIRES_IN,
    `${Number(expiresIn.substring(0, 2)) * 60 * 60 * 1000 +
      new Date().getTime()}`
  );
};

export const getAuthToken = () => storage.getItem(ACCESS_TOKEN);
export const getExpiryTime = () => storage.getItem(EXPIRES_IN);

export const clearAuth = () => {
  storage.removeItem(ACCESS_TOKEN);
  storage.removeItem(EXPIRES_IN);
};

export const isValidSession = () =>
  [EXPIRES_IN, ACCESS_TOKEN].every(
    item => localStorage.getItem(item) !== null
  ) && new Date().getTime() < Number(getExpiryTime());
