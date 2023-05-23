/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-20 00:45:58
 * @LastEditTime: 2023-05-22 22:50:03
 * @FilePath: /guangqi/client/src/components/Auth/ApiErrorWatcher.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React from 'react';
import { useApiErrorBoundary } from '../../hooks/ApiErrorBoundaryContext';
import Router from 'next/router';

const ApiErrorWatcher = () => {
  const { error } = useApiErrorBoundary();
  const router = Router;
  React.useEffect(() => {
    if (error?.response?.status === 500) {
      // do something with error
      router.push('/login');
    }
  }, [error, router]);

  return null;
};

export default ApiErrorWatcher;
