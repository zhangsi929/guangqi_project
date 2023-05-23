/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-22 00:17:00
 * @LastEditTime: 2023-05-22 23:01:12
 * @FilePath: /guangqi/client/src/components/Conversations/index.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
/* eslint no-unused-vars: "off" */
import React from 'react';
import Conversation from './Conversation';

export default function Conversations({ conversations, conversationId, moveToTop }) {
  return (
    <>
      {conversations &&
        conversations.length > 0 &&
        conversations.map((convo) => {
          return (
            <Conversation key={convo.conversationId} conversation={convo} retainView={moveToTop} />
          );
        })}
    </>
  );
}
