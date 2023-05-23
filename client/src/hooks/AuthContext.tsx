/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:36:29
 * @LastEditTime: 2023-05-22 22:57:01
 * @FilePath: /guangqi/client/src/hooks/AuthContext.tsx
 * @Description: AuthContext.tsx
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  createContext,
  useContext
} from 'react';

import {
  TUser,
  TLoginResponse,
  setTokenHeader,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
  TLoginUser
} from '../data-provider';
import router from 'next/router';

export type TAuthContext = {
  user: TUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | undefined;
  login: (data: TLoginUser) => void;
  logout: () => void;
};

export type TUserContext = {
  user?: TUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  redirect?: string;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginUser = useLoginUserMutation();
  const logoutUser = useLogoutUserMutation();
  const userQuery = useGetUserQuery({ enabled: !!token });
  const refreshToken = useRefreshTokenMutation();

  const setUserContext = (userContext: TUserContext) => {
    const { token, isAuthenticated, user, redirect } = userContext;
    if (user) {
      setUser(user);
    }
    setToken(token);
    if (token) {
      setTokenHeader(token);
    }
    setIsAuthenticated(isAuthenticated);
    if (redirect) {
      // TODO: 暂时是为了不要把我push到login页面
      // router.push('/login')
    }
  };

  const getCookieValue = (key: any) => {
    let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };

  const login = (data: TLoginUser) => {
    loginUser.mutate(data, {
      onSuccess: (data: TLoginResponse) => {
        const { user, token } = data;
        setUserContext({ token, isAuthenticated: true, user, redirect: '/chat/new' });
      },
      onError: (error) => {
        setError((error as any).message);
      }
    });
  };

  const logout = () => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        setUserContext({
          token: undefined,
          isAuthenticated: false,
          user: undefined,
          redirect: '/login'
        });
      },
      onError: (error) => {
        setError((error as any).message);
      }
    });
  };

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    } else if (userQuery.isError) {
      setError((userQuery.error as any).message);
      // TODO: 暂时是为了不要把我push到login页面, 这个起了主要作用
      // router.push('/login')
    }
    if (error && isAuthenticated) {
      setError(undefined);
    }
    if (!token || !isAuthenticated) {
      const tokenFromCookie = getCookieValue('token');
      if (tokenFromCookie) {
        // debugger;
        setUserContext({ token: tokenFromCookie, isAuthenticated: true, user: userQuery.data });
      } else {
        // TODO: 暂时是为了不要把我push到login页面
        // router.push('/login')
      }
    }
  }, [token, isAuthenticated, userQuery.data, userQuery.isError]);

  // const silentRefresh = useCallback(() => {
  //   refreshToken.mutate(undefined, {
  //     onSuccess: (data: TLoginResponse) => {
  //       const { user, token } = data;
  //       setUserContext({ token, isAuthenticated: true, user });
  //     },
  //     onError: error => {
  //       setError(error.message);
  //     }
  //   });
  //   setTimeout(silentRefresh, 5 * 60 * 1000);
  // }, [setUserContext]);

  useEffect(() => {
    if (loginUser.isLoading || logoutUser.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loginUser.isLoading, logoutUser.isLoading]);

  // useEffect(() => {
  //   if (token)
  //   silentRefresh();
  // }, [token, silentRefresh]);

  // Make the provider update only when it should
  const memoedValue = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading, error, isAuthenticated, token]
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext should be used inside AuthProvider');
  }

  return context;
};

export { AuthContextProvider, useAuthContext };
