/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:18:49
 * @LastEditTime: 2023-05-30 21:53:55
 * @FilePath: /guangqi/client/src/pages/_app.tsx
 * @Description:
 *
 * _app.js: this is the root file of the code base. It is quite like the index.js file in create-react-app.
 * Here, you can apply any global style(s), add new themes, provide context to the whole application, and so on.
 * This file gives some shared context/parent component to all the pages in the application.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

// pages/_app.tsx
import '../styles/style.css';
import '../styles/mobile.css';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ApiErrorBoundaryProvider, useApiErrorBoundary } from '../hooks/ApiErrorBoundaryContext';
import { AuthContextProvider } from '../hooks/AuthContext';
import ApiErrorWatcher from '../components/Auth/ApiErrorWatcher';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '../hooks/ThemeContext';
import { ScreenshotProvider } from '../utils/screenshotContext';
import type { AppProps } from 'next/app';
import React from 'react';
import Root from '../routes/Root';

type MyError = {
  response?: {
    status?: number;
  };
};
const NoLayoutPages = ['/login', '/register', '/forgot-password', '/reset-password']; // Add paths of pages that should not use Root layout

// we have two functions because useApiErrorBoundary() is a hook and we can't use hooks outside of components AND it need to be used in the ApiErrorBoundaryProvider
function App({ Component, pageProps, router }: AppProps) {
  const { setError } = useApiErrorBoundary();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const err = error as MyError;
          if (err.response?.status === 401) {
            setError(error);
          }
        }
      }
    })
  });
  if (router.pathname === '/') {
    return <Component {...pageProps} />;
  }
  return (
    <ScreenshotProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider initialTheme="light">
            {router.pathname === '/login' ? (
              <AuthContextProvider>
                <Component {...pageProps} />
                <ApiErrorWatcher />
              </AuthContextProvider>
            ) : NoLayoutPages.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <AuthContextProvider>
                <Root Component={Component} pageProps={pageProps} />
                <ApiErrorWatcher />
              </AuthContextProvider>
            )}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ScreenshotProvider>
  );
}

//TIP:
//AppProps is a type exported by the Next.js framework, and it's used to type the properties of the App component.
//This App component is a top-level component which is common across all different pages.
//It's similar to a layout component and is often used to keep state and functions that are accessible across all pages.

function MyApp(props: AppProps) {
  return (
    <ApiErrorBoundaryProvider>
      <App {...props} />
    </ApiErrorBoundaryProvider>
  );
}

export default MyApp;
