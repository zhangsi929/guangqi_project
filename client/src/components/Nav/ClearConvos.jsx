/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:55:49
 * @LastEditTime: 2023-05-29 17:48:46
 * @FilePath: /guangqi/client/src/components/Nav/ClearConvos.jsx
 * @Description:
 *
 * 点击删除对话跳出来对话框
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useEffect } from 'react';
import store from 'src/store';
import { Dialog } from '../ui/Dialog.tsx';
import DialogTemplate from '../ui/DialogTemplate';
import { useClearConversationsMutation } from 'src/data-provider';

const ClearConvos = ({ open, onOpenChange }) => {
  const { newConversation } = store.useConversation();
  const { refreshConversations } = store.useConversations();
  const clearConvosMutation = useClearConversationsMutation();

  const clickHandler = () => {
    console.log('Clearing conversations...');
    clearConvosMutation.mutate();
  };

  useEffect(() => {
    if (clearConvosMutation.isSuccess) {
      newConversation();
      refreshConversations();
    }
  }, [clearConvosMutation.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTemplate
        title="删除对话"
        description="您确认要清除所有对话吗？此操作无法撤消。"
        selection={{
          selectHandler: clickHandler,
          selectClasses: 'bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white',
          selectText: '删除'
        }}
      />
    </Dialog>
  );
};

export default ClearConvos;
