// pages/_app.tsx
import '../styles/style.css';
import '../styles/mobile.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ThemeProvider } from '../hooks/ThemeContext';
import { ScreenshotProvider } from '../utils/screenshotContext';
import { useApiErrorBoundary } from '../hooks/ApiErrorBoundaryContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { setError } = useApiErrorBoundary();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error?.response?.status === 401) {
          setError(error);
        }
      }
    })
  });

  return (
    <ScreenshotProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider>
              <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ScreenshotProvider>
  );
}
export default MyApp;
