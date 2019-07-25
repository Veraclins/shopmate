import axios from 'axios';
import config from 'config';
import { getAuthToken, INVALID_SESSION } from 'helpers/auth';
import store from 'store';
import { logout } from 'state/user';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: config.BASE_URL,
});

instance.interceptors.request.use(config => {
  const token = getAuthToken();
  config.headers['user-key'] = token;
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    const formatedError = error.response ? error.response : error;
    if (formatedError.data.error === 'TokenExpiredError: jwt expired') {
      store.dispatch(logout());
      toast.error(INVALID_SESSION);
    }
    throw formatedError;
  }
);

export default instance;
