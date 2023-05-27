/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:40:45
 * @LastEditTime: 2023-05-27 00:37:10
 * @FilePath: /guangqi/client/src/pages/login.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { AuthContextProvider } from '../hooks/AuthContext';
import ApiErrorWatcher from '../components/Auth/ApiErrorWatcher';
import Login from '../components/Auth/Login';

export default function LoginPage() {
  return <Login />;
}
