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
export const getProducts = (params) => api.get('/products/', { params }).then((res) => res.data);
export const getProduct = (id) => api.get(`/products/${id}/`).then((res) => res.data);
export const createProduct = (product) => api.post('/products/', product).then((res) => res.data);
export const updateProduct = (id, product) => api.put(`/products/${id}/`, product).then((res) => res.data);
export const deleteProduct = (id) => api.delete(`/products/${id}/`).then((res) => res.data);

// Vendors
export const getVendors = () => api.get('/vendor/').then((res) => res.data);
export const getVendor = (id) => api.get(`/vendor/${id}/`).then((res) => res.data);
export const createVendor = (vendor) => api.post('/vendor/', vendor).then((res) => res.data);
export const updateVendor = (id, vendor) => api.put(`/vendor/${id}/`, vendor).then((res) => res.data);
export const deleteVendor = (id) => api.delete(`/vendor/${id}/`).then((res) => res.data);

// Product Stock
export const getProductStocks = (params) => api.get('/products-stock/', { params }).then((res) => res.data);
export const getProductStock = (id) => api.get(`/products-stock/${id}/`).then((res) => res.data);
export const createProductStock = (product) => api.post('/products-stock/', product).then((res) => res.data);
export const updateProductStock = (id, product) => api.put(`/products-stock/${id}/`, product).then((res) => res.data);
export const deleteProductStock = (id) => api.delete(`/products-stock/${id}/`).then((res) => res.data);
export const buklUpdateProductStocks = (products) =>
  api.post(`/products-stock/bulk_update/`, products).then((res) => res.data);

// Sellers
export const getSellers = (params) => api.get('/seller-profile/', { params }).then((res) => res.data);
export const getSeller = (id) => api.get(`/seller-profile/${id}/`).then((res) => res.data);
export const createSeller = (seller) => api.post('/seller-profile/', seller).then((res) => res.data);
export const updateSeller = (id, seller) => api.put(`/seller-profile/${id}/`, seller).then((res) => res.data);
export const deleteSeller = (id) => api.delete(`/seller-profile/${id}/`).then((res) => res.data);

// Cash Orders
export const getCashOrders = (params) => api.get('/cashorder/', { params }).then((res) => res.data);
export const getCashOrder = (id) => api.get(`/cashorder/${id}/`).then((res) => res.data);
export const createCashOrder = (cashorder) => api.post('/cashorder/', cashorder).then((res) => res.data);
export const updateCashOrder = (id, cashorder) => api.put(`/cashorder/${id}/`, cashorder).then((res) => res.data);
export const deleteCashOrder = (id) => api.delete(`/cashorder/${id}/`).then((res) => res.data);

// Return cash orders
export const getReturnCashOrders = (params) => api.get('/return-cashorder/', { params }).then((res) => res.data);
export const getReturnCashOrder = (id) => api.get(`/return-cashorder/${id}/`).then((res) => res.data);
export const createReturnCashOrder = (returncashorder) =>
  api.post('/return-cashorder/', returncashorder).then((res) => res.data);
export const updateReturnCashOrder = (id, returncashorder) =>
  api.put(`/return-cashorder/${id}/`, returncashorder).then((res) => res.data);
export const deleteReturnCashOrder = (id) => api.delete(`/return-cashorder/${id}/`).then((res) => res.data);

// Profile
export const getUser = () => api.get(`/accounts/user/`);

// IMEI
export const getIMEIs = () => api.get('/imei-numbers/').then((res) => res.data);
export const getIMEI = (id) => api.get(`/imei-numbers/${id}`).then((res) => res.data);
export const createIMEI = (values) => api.post('/imei-numbers/', values).then((res) => res.data);
export const deleteIMEI = (id) => api.delete(`/imei-numbers/${id}`).then((res) => res.data);
export const updateIMEI = (id, values) => api.patch(`/imei-numbers/${id}`, values).then((res) => res.data);

// Company Profile
export const getCompanyProfile = (id) => api.get(`/company-profile/${id}/`).then((res) => res.data);
export const updateCompanyProfile = (id, values) => api.put(`/company-profile/${id}/`, values).then((res) => res.data);

// Reports
export const getCashOrderReport = (params) => api.get('/export/cashorder/', { params }).then((res) => res.data);
export const getReturnCashOrderReport = (params) =>
  api.get('/export/return-cashorder/', { params }).then((res) => res.data);

// credit
export const getCredits = (params) => api.get('/credit/', { params }).then((res) => res.data);
export const getCredit = (id) => api.get(`/credit/${id}/`).then((res) => res.data);
export const createCredit = (values) => api.post('/credit/', values).then((res) => res.data);
export const updateCredit = (id, values) => api.put(`/credit/${id}/`, values).then((res) => res.data);
export const deleteCredit = (id) => api.delete(`/credit/${id}`).then((res) => res.data);

// claim
export const getClaims = (params) => api.get('/claim/', { params }).then((res) => res.data);
export const getClaim = (id) => api.get(`/claim/${id}/`).then((res) => res.data);
export const createClaim = (values) => api.post('/claim/', values).then((res) => res.data);
export const updateClaim = (id, values) => api.put(`/claim/${id}/`, values).then((res) => res.data);
export const deleteClaim = (id) => api.delete(`/claim/${id}`).then((res) => res.data);

// week closure
export const getWeekClosures = (params) => api.get('/week-closure/', { params }).then((res) => res.data);
export const createWeekClosure = () => api.post('/week-closure/').then((res) => res.data);
export const getWeekClosureReport = () => api.get('/export/week-closure/').then((res) => res.data);
