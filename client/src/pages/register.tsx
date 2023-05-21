/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:40:45
 * @LastEditTime: 2023-05-20 21:42:00
 * @FilePath: /guangqi/client/src/pages/register.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { AuthContextProvider } from '../hooks/AuthContext';
import ApiErrorWatcher from '../components/Auth/ApiErrorWatcher';
import Registration from '../components/Auth/Registration';

export default function LoginPage() {
  return (
    // <AuthContextProvider> // when this active, we will redirect to login page in dev mode
    //   <Registration />
    //   <ApiErrorWatcher />
    // </AuthContextProvider>
    <Registration />
  );
}
