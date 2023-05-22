/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:40:45
 * @LastEditTime: 2023-05-22 00:01:10
 * @FilePath: /guangqi/client/src/pages/reset-password.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import ApiErrorWatcher from '../components/Auth/ApiErrorWatcher';
import RequestPasswordReset from '../components/Auth/RequestPasswordReset';

export default function LoginPage() {
  return (
    <RequestPasswordReset />
  );
}
