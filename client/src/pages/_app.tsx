/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:18:49
 * @LastEditTime: 2023-05-20 16:53:44
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
import { ApiErrorBoundaryProvider } from "../hooks/ApiErrorBoundaryContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "../hooks/ThemeContext";
import { ScreenshotProvider } from "../utils/screenshotContext";
import type { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error?.response?.status === 401) {
          // This error handling will be different in Next.js. You'll probably want to use Next.js' router here.
          // we want all pages to redirect to login if the user is not authenticated????
          router.push("/login");
        }
      },
    }),
  });

  return (
    <ApiErrorBoundaryProvider>
      <ScreenshotProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ThemeProvider>
              <Component {...pageProps} />
              {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </ThemeProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </ScreenshotProvider>
    </ApiErrorBoundaryProvider>
  );
}
export default MyApp;
