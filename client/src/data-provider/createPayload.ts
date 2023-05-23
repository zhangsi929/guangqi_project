/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-20 17:08:52
 * @LastEditTime: 2023-05-23 00:14:56
 * @FilePath: /guangqi/client/src/data-provider/createPayload.ts
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import type { TSubmission } from './types';

export default function createPayload(submission: TSubmission) {
  // TODO: BUG? conversation's type?
  const { conversation, message, endpointOption } = submission;
  const { conversationId } = conversation;
  const { endpoint } = endpointOption;

  const endpointUrlMap = {
    azureOpenAI: '/api/ask/azureOpenAI',
    openAI: '/api/ask/openAI',
    google: '/api/ask/google',
    bingAI: '/api/ask/bingAI',
    chatGPTBrowser: '/api/ask/chatGPTBrowser'
  };
  //@ts-ignore
  const server = endpointUrlMap[endpoint];

  let payload = {
    ...message,
    ...endpointOption,
    conversationId
  };

  return { server, payload };
}
