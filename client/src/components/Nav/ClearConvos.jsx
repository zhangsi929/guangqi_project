/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:55:49
 * @LastEditTime: 2023-05-22 23:02:09
 * @FilePath: /guangqi/client/src/components/Nav/ClearConvos.jsx
 * @Description:
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
        title="Clear conversations"
        description="Are you sure you want to clear all conversations? This is irreversible."
        selection={{
          selectHandler: clickHandler,
          selectClasses: 'bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white',
          selectText: 'Clear'
        }}
      />
    </Dialog>
  );
};

export default ClearConvos;