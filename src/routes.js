import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
import Sellers from './pages/sellers/Sellers';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import ProductStock from './pages/productstock/ProductsStock';
import DashboardApp from './pages/DashboardApp';
import withAuthenticationRequired from './utils/withAuthenticationRequired';
import ProductStockAdd from './pages/productstock/ProductStockAdd';
import ProductStockEdit from './pages/productstock/ProductStockEdit';
import SellerAdd from './pages/sellers/SellerAdd';
import SellerEdit from './pages/sellers/SellerEdit';
import CashOrders from './pages/cashorders/CashOrders';
import CashOrderAdd from './pages/cashorders/CashOrderAdd';
import CashOrderEdit from './pages/cashorders/CashOrderEdit';
import Settings from './pages/settings/Settings';
import ReturnCashOrders from './pages/returncashorders/ReturnCashOrders';
import ReturnCashOrderAdd from './pages/returncashorders/ReturnCashOrderAdd';
import ReturnCashOrderEdit from './pages/returncashorders/ReturnCashOrderEdit';
import BusinessStats from './pages/businessstats/BusinessStats';
import Products from './pages/products/Products';
import ProductAdd from './pages/products/ProductAdd';
import ProductEdit from './pages/products/ProductEdit';
import Vendors from './pages/vendors/Vendors';
import VendorAdd from './pages/vendors/VendorAdd';
import VendorEdit from './pages/vendors/VendorEdit';
import Reports from './pages/reports/Reports';
import Credits from './pages/credit/Credit';
import CreditEdit from './pages/credit/CreditEdit';
import CreditAdd from './pages/credit/CreditAdd';
import Claims from './pages/claim/Claim';
import ClaimEdit from './pages/claim/ClaimEdit';
import ClaimAdd from './pages/claim/ClaimAdd';
import WeekClosures from './pages/weekclosure/WeekClosures';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: withAuthenticationRequired(DashboardLayout),
      children: [
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'products',
          children: [
            { path: '/dashboard/products', element: <Products /> },
            { path: 'add', element: <ProductAdd /> },
            { path: 'edit/:id', element: <ProductEdit /> },
          ],
        },
        {
          path: 'product-stock',
          children: [
            { path: '/dashboard/product-stock', element: <ProductStock /> },
            { path: 'add', element: <ProductStockAdd /> },
            { path: 'edit/:id', element: <ProductStockEdit /> },
          ],
        },
        {
          path: 'vendors',
          children: [
            { path: '/dashboard/vendors', element: <Vendors /> },
            { path: 'add', element: <VendorAdd /> },
            { path: 'edit/:id', element: <VendorEdit /> },
          ],
        },
        {
          path: 'sellers',
          children: [
            { path: '/dashboard/sellers', element: <Sellers /> },
            { path: 'add', element: <SellerAdd /> },
            { path: 'edit/:id', element: <SellerEdit /> },
          ],
        },
        {
          path: 'cashorder',
          children: [
            { path: '/dashboard/cashorder', element: <CashOrders /> },
            { path: 'add', element: <CashOrderAdd /> },
            { path: 'edit/:id', element: <CashOrderEdit /> },
          ],
        },
        {
          path: 'return-cashorder',
          children: [
            { path: '/dashboard/return-cashorder', element: <ReturnCashOrders /> },
            { path: 'add', element: <ReturnCashOrderAdd /> },
            { path: 'edit/:id', element: <ReturnCashOrderEdit /> },
          ],
        },
        {
          path: 'reports',
          children: [
            { path: '/dashboard/reports', element: <Reports /> },
            // { path: 'add', element: <ReturnCashOrderAdd /> },
            // { path: 'edit/:id', element: <ReturnCashOrderEdit /> },
          ],
        },
        {
          path: 'credit',
          children: [
            { path: '/dashboard/credit', element: <Credits /> },
            { path: 'add', element: <CreditAdd /> },
            { path: 'edit/:id', element: <CreditEdit /> },
          ],
        },
        {
          path: 'claim',
          children: [
            { path: '/dashboard/claim', element: <Claims /> },
            { path: 'add', element: <ClaimAdd /> },
            { path: 'edit/:id', element: <ClaimEdit /> },
          ],
        },
        { path: 'week-closure', element: <WeekClosures /> },
        { path: 'settings', element: <Settings /> },
        { path: 'business-stats', element: <BusinessStats /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
