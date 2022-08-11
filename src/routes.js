import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Sellers from './pages/sellers/Sellers';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/products/Products';
import DashboardApp from './pages/DashboardApp';
import withAuthenticationRequired from './utils/withAuthenticationRequired';
import ProductAdd from './pages/products/ProductAdd';
import ProductEdit from './pages/products/ProductEdit';
import SellerAdd from './pages/sellers/SellerAdd';
import SellerEdit from './pages/sellers/SellerEdit';

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
          path: 'sellers',
          children: [
            { path: '/dashboard/sellers', element: <Sellers /> },
            { path: 'add', element: <SellerAdd /> },
            { path: 'edit/:id', element: <SellerEdit /> },
          ],
        },
        { path: 'cashorder', element: <Blog /> },
        { path: 'return-cashorder', element: <Blog /> },
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
