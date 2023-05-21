/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:18:49
 * @LastEditTime: 2023-05-20 17:50:03
 * @FilePath: /guangqi/client/src/pages/_app.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
// pages/_app.tsx
import "../styles/style.css";
import "../styles/mobile.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import {
  ApiErrorBoundaryProvider,
  useApiErrorBoundary,
} from "../hooks/ApiErrorBoundaryContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "../hooks/ThemeContext";
import { ScreenshotProvider } from "../utils/screenshotContext";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";

type MyError = {
  response?: {
    status?: number;
  };
};

function App({ Component, pageProps }: AppProps) {
  const { setError } = useApiErrorBoundary();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const err = error as MyError;
          if (err.response?.status === 401) {
            setError(error);
          }
        }
      },
    }),
  });

  return (
    <ScreenshotProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider initialTheme="light">
            <Component {...pageProps} />
            {process.env.NODE_ENV === "development" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ScreenshotProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ApiErrorBoundaryProvider>
      <App Component={Component} pageProps={pageProps} />
    </ApiErrorBoundaryProvider>
  );
}
export default MyApp;
