import api from './api-client';
import { removeToken, setToken } from '../utils/helpers';

export const login = (logindata) =>
  api.post(`/accounts/login/`, logindata).then((res) => {
    setToken(res.data.key);
    return res.data;
  });

export const logout = () => {
  try {
    removeToken();
    window.location.replace('/login');
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const register = (registerdata) =>
  api.post(`/accounts/signup/`, registerdata).then((res) => {
    setToken(res.data.token);
    return res.data;
  });

// Settings
export const getSettings = (id) => api.get(`/settings/${id}/`).then((res) => res.data);
export const updateSettings = (id, settings) => api.put(`/settings/${id}/`, settings).then((res) => res.data);

// Products
export const getProducts = () => api.get('/products/').then((res) => res.data);
export const getProduct = (id) => api.get(`/products/${id}/`).then((res) => res.data);
export const createProduct = (product) => api.post('/products/', product).then((res) => res.data);
export const updateProduct = (id, product) => api.put(`/products/${id}/`, product).then((res) => res.data);
export const deleteProduct = (id) => api.delete(`/products/${id}/`).then((res) => res.data);

// Sellers
export const getSellers = () => api.get('/seller-profile/').then((res) => res.data);
export const getSeller = (id) => api.get(`/seller-profile/${id}/`).then((res) => res.data);
export const createSeller = (seller) => api.post('/seller-profile/', seller).then((res) => res.data);
export const updateSeller = (id, seller) => api.put(`/seller-profile/${id}/`, seller).then((res) => res.data);
export const deleteSeller = (id) => api.delete(`/seller-profile/${id}/`).then((res) => res.data);

// Cash Orders
export const getCashOrders = () => api.get('/cashorder/').then((res) => res.data);
export const getCashOrder = (id) => api.get(`/cashorder/${id}/`).then((res) => res.data);
export const createCashOrder = (cashorder) => api.post('/cashorder/', cashorder).then((res) => res.data);
export const updateCashOrder = (id, cashorder) => api.put(`/cashorder/${id}/`, cashorder).then((res) => res.data);
export const deleteCashOrder = (id) => api.delete(`/cashorder/${id}/`).then((res) => res.data);

// Return cash orders
export const getReturnCashOrders = () => api.get('/return-cashorder/').then((res) => res.data);
export const getReturnCashOrder = (id) => api.get(`/return-cashorder/${id}/`).then((res) => res.data);
export const createReturnCashOrder = (returncashorder) =>
  api.post('/return-cashorder/', returncashorder).then((res) => res.data);
export const updateReturnCashOrder = (id, returncashorder) =>
  api.put(`/return-cashorder/${id}/`, returncashorder).then((res) => res.data);
export const deleteReturnCashOrder = (id) => api.delete(`/return-cashorder/${id}/`).then((res) => res.data);

// Profile
export const getUser = () => api.get(`/accounts/user/`);
