// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'vendor',
    path: '/dashboard/vendors',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'seller',
    path: '/dashboard/sellers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'products stock',
    path: '/dashboard/product-stock',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'cash order',
    path: '/dashboard/cashorder',
    icon: getIcon('mdi:account-cash'),
  },
  {
    title: 'return cash order',
    path: '/dashboard/return-cashorder',
    icon: getIcon('mdi:cash-remove'),
  },
  {
    title: 'credit',
    path: '/dashboard/credit',
    icon: getIcon('eva:credit-card-outline'),
  },
  {
    title: 'claim',
    path: '/dashboard/claim',
    icon: getIcon('eva:alert-triangle-outline'),
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon('eva:bar-chart-fill'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
