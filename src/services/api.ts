import axios from 'axios';
import config from 'config';
import { getAuthToken } from 'helpers/auth';

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
    throw formatedError;
  }
);

export default instance;
