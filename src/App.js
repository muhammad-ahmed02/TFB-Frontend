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

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();
  const { open, message, handleClose } = useToast();

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <QueryClientProvider client={queryClient}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          message={message}
        />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
