/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:48:31
 * @LastEditTime: 2023-05-22 22:52:43
 * @FilePath: /guangqi/client/src/store/submission.js
 * @Description:
 *
 * Recoil Store: submission
 * This store is used to store the current submission.
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
import buildTree from 'src/utils/buildTree';

// current submission
// submit any new value to this state will cause new message to be send.
// set to null to give up any submission
// {
//   conversation, // target submission, must have: model, chatGptLabel, promptPrefix
//   messages, // old messages
//   message, // request message
//   initialResponse, // response message
//   isRegenerate=false, // isRegenerate?
// }

const submission = atom({
  key: 'submission',
  default: null
});

const isSubmitting = atom({
  key: 'isSubmitting',
  default: false
});

export default {
  submission,
  isSubmitting
};
