/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:55:49
 * @LastEditTime: 2023-05-27 18:46:55
 * @FilePath: /guangqi/client/src/components/Nav/ExportConversation/index.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useState, forwardRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Download } from 'lucide-react';
import { cn } from 'src/utils/';

import ExportModel from './ExportModel';

import store from 'src/store';

const ExportConversation = forwardRef(() => {
  const [open, setOpen] = useState(false);

  const conversation = useRecoilValue(store.conversation) || {};

  const exportable =
    conversation?.conversationId &&
    conversation?.conversationId !== 'new' &&
    conversation?.conversationId !== 'search';

  const clickHandler = () => {
    if (exportable) setOpen(true);
  };

  return (
    <>
      <button
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700',
          exportable ? 'cursor-pointer text-white' : 'cursor-not-allowed text-gray-400'
        )}
        onClick={clickHandler}
      >
        <Download size={16} />
        下载聊天记录
      </button>

      <ExportModel open={open} onOpenChange={setOpen} />
    </>
  );
});

export default ExportConversation;
