import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import withAuthenticationRequired from './utils/withAuthenticationRequired';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: withAuthenticationRequired(DashboardLayout),
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        {
          path: 'products',
          element: <Products />,
          children: [
            { path: 'add', element: <Products /> },
            { path: 'edit/:id', element: <Products /> },
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
