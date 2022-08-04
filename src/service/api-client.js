import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../config';
import { getToken, removeToken } from '../utils/helpers';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL || REACT_APP_BACKEND_URL}/api/v1`,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `jwt ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
