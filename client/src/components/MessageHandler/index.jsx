/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:44:51
 * @LastEditTime: 2023-06-03 21:25:06
 * @FilePath: /guangqi/client/src/components/MessageHandler/index.jsx
 * @Description:
 *
 * This is the actual place to call API, using react hooks and custom hooks
 * 真正发送消息和返回的地方
 * User Action
    |
    v
Change `submission` state
    |
    v
Trigger `useEffect` in MessageHandler
    |
    v
Create new API request (URL and payload from `createPayload`)
    |
    v
Create new SSE object for API connection
    |
    v
Open connection and send API request
    |
    v
Trigger `events.onmessage` when API starts returning data
    |
    v
Invoke `finalHandler` or `createdHandler` based on returned data (`final` or `created` field)
    |
    v
Update application state (`messages`, `conversation`) in handler
    |
    v
Trigger re-render and display updated messages in UI
    |
    v
If error at any step, trigger `events.onerror` and invoke `errorHandler` to display error message
 *
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { SSE } from 'src/data-provider/sse.mjs';
import createPayload from 'src/data-provider/createPayload';
import { useAbortRequestWithMessage } from 'src/data-provider';
import store from 'src/store';
import { useAuthContext } from 'src/hooks/AuthContext';
import { useApiBalance } from 'src/store/apiUsage';

export default function MessageHandler() {
  const submission = useRecoilValue(store.submission);
  const setIsSubmitting = useSetRecoilState(store.isSubmitting);
  const setMessages = useSetRecoilState(store.messages);
  const setConversation = useSetRecoilState(store.conversation);
  const resetLatestMessage = useResetRecoilState(store.latestMessage);
  const { token } = useAuthContext();
  const { refreshConversations } = store.useConversations();
  const { balance, decrementBalance } = useApiBalance();

  const messageHandler = (data, submission) => {
    const { messages, message, initialResponse, isRegenerate = false } = submission;

    if (isRegenerate) {
      setMessages([
        ...messages,
        {
          ...initialResponse,
          text: data,
          parentMessageId: message?.overrideParentMessageId,
          messageId: message?.overrideParentMessageId + '_',
          submitting: true
          // unfinished: true
        }
      ]);
    } else {
      setMessages([
        ...messages,
        message,
        {
          ...initialResponse,
          text: data,
          parentMessageId: message?.messageId,
          messageId: message?.messageId + '_',
          submitting: true
          // unfinished: true
        }
      ]);
    }
  };

  const cancelHandler = (data, submission) => {
    const { messages, isRegenerate = false } = submission;

    const { requestMessage, responseMessage, conversation } = data;

    // update the messages
    if (isRegenerate) {
      setMessages([...messages, responseMessage]);
    } else {
      setMessages([...messages, requestMessage, responseMessage]);
    }
    setIsSubmitting(false);

    // refresh title
    if (requestMessage.parentMessageId == '00000000-0000-0000-0000-000000000000') {
      setTimeout(() => {
        refreshConversations();
      }, 2000);

      // in case it takes too long.
      setTimeout(() => {
        refreshConversations();
      }, 5000);
    }

    setConversation((prevState) => ({
      ...prevState,
      ...conversation
    }));
  };

  const createdHandler = (data, submission) => {
    const { messages, message, initialResponse, isRegenerate = false } = submission;

    if (isRegenerate)
      setMessages([
        ...messages,
        {
          ...initialResponse,
          parentMessageId: message?.overrideParentMessageId,
          messageId: message?.overrideParentMessageId + '_',
          submitting: true
        }
      ]);
    else
      setMessages([
        ...messages,
        message,
        {
          ...initialResponse,
          parentMessageId: message?.messageId,
          messageId: message?.messageId + '_',
          submitting: true
        }
      ]);

    const { conversationId } = message;
    setConversation((prevState) => ({
      ...prevState,
      conversationId
    }));
    resetLatestMessage();
  };

  const finalHandler = (data, submission) => {
    const { messages, isRegenerate = false } = submission;

    const { requestMessage, responseMessage, conversation } = data;

    // update the messages
    if (isRegenerate) setMessages([...messages, responseMessage]);
    else setMessages([...messages, requestMessage, responseMessage]);
    setIsSubmitting(false);

    // refresh title
    if (requestMessage.parentMessageId == '00000000-0000-0000-0000-000000000000') {
      setTimeout(() => {
        refreshConversations();
      }, 2000);

      // in case it takes too long.
      setTimeout(() => {
        refreshConversations();
      }, 5000);
    }

    setConversation((prevState) => ({
      ...prevState,
      ...conversation
    }));

    //更新用户的api balance 个数
    decrementBalance();
  };

  const errorHandler = (data, submission) => {
    const { messages, message } = submission;

    console.log('Error:', data);
    const errorResponse = {
      ...data,
      error: true,
      parentMessageId: message?.messageId
    };
    setIsSubmitting(false);
    setMessages([...messages, message, errorResponse]);
    return;
  };

  const abortConversation = (conversationId) => {
    console.log(submission);
    const { endpoint } = submission?.conversation || {};
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ask/${endpoint}/abort`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        abortKey: conversationId
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('aborted', data);
        decrementBalance();
        cancelHandler(data, submission);
      })
      .catch((error) => {
        console.error('Error aborting request');
        console.error(error);
        // errorHandler({ text: 'Error aborting request' }, { ...submission, message });
      });
    return;
  };

  useEffect(() => {
    if (submission === null) return;
    if (Object.keys(submission).length === 0) return;

    let { message } = submission;

    const { server, payload } = createPayload(submission); //server is url: '/api/ask/openAI' no prefix
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + server; // '/api/ask/openAI'
    const events = new SSE(url, {
      payload: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });

    console.log('Token zhang hahahahahha:', token); // Log the token value

    events.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.final) {
        finalHandler(data, { ...submission, message });
        console.log('final', data);
      }
      if (data.created) {
        message = {
          ...data.message,
          overrideParentMessageId: message?.overrideParentMessageId
        };
        createdHandler(data, { ...submission, message });
        console.log('created', message);
      } else {
        let text = data.text || data.response;
        if (data.initial) console.log(data);

        if (data.message) {
          messageHandler(text, { ...submission, message });
        }
      }
    };

    events.onopen = () => console.log('connection is opened');

    events.oncancel = () =>
      abortConversation(message?.conversationId || submission?.conversationId);

    events.onerror = function (e) {
      console.log('error in opening conn.');
      events.close();

      const data = JSON.parse(e.data);

      errorHandler(data, { ...submission, message });
    };

    setIsSubmitting(true);
    events.stream();

    return () => {
      const isCancelled = events.readyState <= 1;
      events.close();
      // setSource(null);
      if (isCancelled) {
        const e = new Event('cancel');
        events.dispatchEvent(e);
      }
      setIsSubmitting(false);
    };
  }, [submission]);

  return null;
}
