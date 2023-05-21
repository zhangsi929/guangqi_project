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
