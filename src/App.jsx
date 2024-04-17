import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import GlobalStyles from './styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import AppRouter from './AppRouter';

function App() {
  const queryClinent = new QueryClient();

  return (
    <QueryClientProvider client={queryClinent}>

      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />

      <AppRouter />

      <Toaster
        gutter={12}
        containerStyle={{ margin: '8px' }}
        position='top-center'
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 4000 },
          style: {
            fontSize: '16px',
            padding: '16px 24px',
            maxWidth: '500px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
      
    </QueryClientProvider>
  );
}

export default App;
