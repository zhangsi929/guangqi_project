/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:19:10
 * @LastEditTime: 2023-05-20 16:53:08
 * @FilePath: /guangqi/client/src/hooks/ApiErrorBoundaryContext.tsx
 * @Description:
 *
 * The ApiErrorBoundaryProvider provides an error state and setError function to its child components.
 * Any component inside this provider can use useApiErrorBoundary to access this state and function.
 * When the setError function is called, it will update the error state in the ApiErrorBoundaryProvider,
 * and this state change will be propagated to all components using useApiErrorBoundary.
 * So, if you have any error handling logic that needs to be shared across multiple components, you can use this hook to do it.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

// TIP: react node:
// This is particularly useful in typing functions or components that can return or accept a wide variety of potential renderable items, as is often the case in React.

import React, { useState, ReactNode } from "react";

export type ApiError = {
  error: any;
  setError: (error: any) => void;
};

const ApiErrorBoundaryContext = React.createContext<ApiError | undefined>(
  undefined
);

export const ApiErrorBoundaryProvider = ({
  value,
  children,
}: {
  value?: ApiError;
  children: ReactNode;
}) => {
  const [error, setError] = useState(false);
  return (
    <ApiErrorBoundaryContext.Provider
      value={value ? value : { error, setError }}
    >
      {children}
    </ApiErrorBoundaryContext.Provider>
  );
};

export const useApiErrorBoundary = () => {
  const context = React.useContext(ApiErrorBoundaryContext);

  if (context === undefined) {
    throw new Error(
      "useApiErrorBoundary must be used inside ApiErrorBoundaryProvider"
    );
  }

  return context;
};
