/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:51:01
 * @LastEditTime: 2023-05-21 20:02:41
 * @FilePath: /guangqi/client/src/pages/search/[query].tsx
 * @Description: 
 * 
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved. 
 */
import { AuthContextProvider } from '../../hooks/AuthContext';
import ApiErrorWatcher from '../../components/Auth/ApiErrorWatcher';
import Chat from '../../routes/Chat';
export default function CharPage() {
  return (
    <AuthContextProvider>
      <Chat />
      <ApiErrorWatcher />
    </AuthContextProvider>
  );
}