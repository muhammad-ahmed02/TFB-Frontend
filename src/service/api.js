import api from './api-client';
import { removeToken, setToken } from '../utils/helpers';

export const login = (logindata) => api.post(`/accounts/login/`, logindata).then((res) => {
    setToken(res.data.token);
    return res.data;
  });

export const register = (registerdata) => api.post(`/accounts/signup/`, registerdata).then((res) => {
    setToken(res.data.token);
    return res.data;
  });

export const getUser = () => api.get(`/auth/user/`);
