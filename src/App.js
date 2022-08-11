import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Snackbar } from '@mui/material';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useToast } from './hooks/useToast';
import './styles.css';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <Toast />
      <ScrollToTop />
      <BaseOptionChartStyle />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function Toast() {
  const { open, message, handleClose } = useToast();
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      message={message}
    />
  );
}
