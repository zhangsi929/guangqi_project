/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:48:31
 * @LastEditTime: 2023-05-22 22:56:34
 * @FilePath: /guangqi/client/src/store/conversations.js
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
/* eslint no-unused-vars: "off" */
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

const refreshConversationsHint = atom({
  key: 'refreshConversationsHint',
  default: 1
});

const useConversations = () => {
  const setRefreshConversationsHint = useSetRecoilState(refreshConversationsHint);

  const refreshConversations = () => setRefreshConversationsHint((prevState) => prevState + 1);

  return { refreshConversations };
};

export default { refreshConversationsHint, useConversations };
