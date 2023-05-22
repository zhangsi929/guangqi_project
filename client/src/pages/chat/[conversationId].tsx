/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:50:47
 * @LastEditTime: 2023-05-22 00:01:39
 * @FilePath: /guangqi/client/src/pages/chat/[conversationId].tsx
 * @Description:
 *
 * This file will handle /chat/anything route
 * Chat component will handle /new and /id both cases
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import ApiErrorWatcher from '../../components/Auth/ApiErrorWatcher';
import Chat from '../../routes/Chat';
export default function CharPage() {
  return (
      <Chat />
  );
}
