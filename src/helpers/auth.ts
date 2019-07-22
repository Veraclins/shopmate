import storage from 'helpers/storage';

export const setAuthToken = (token: string) =>
  storage.setItem('accessToken', token);

export const setExpiryTime = (expiresIn: string) => {
  const expiresInMiliSeconds =
    Number(expiresIn.substring(0, 1)) * 60 * 60 * 1000;
  storage.setItem('expiresIn', `${expiresInMiliSeconds}`);
};

export const getAuthToken = () => storage.getItem('accessToken');

export const clearAuth = () => {
  storage.removeItem('accessToken');
  storage.removeItem('expiresIn');
};
