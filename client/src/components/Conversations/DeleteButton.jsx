/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-22 00:17:00
 * @LastEditTime: 2023-05-22 22:49:56
 * @FilePath: /guangqi/client/src/components/Conversations/DeleteButton.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useEffect } from 'react';
import TrashIcon from '../svg/TrashIcon';
import CrossIcon from '../svg/CrossIcon';
import { useRecoilValue } from 'recoil';
import { useDeleteConversationMutation } from 'src/data-provider';

import store from 'src/store';

export default function DeleteButton({ conversationId, renaming, cancelHandler, retainView }) {
  const currentConversation = useRecoilValue(store.conversation) || {};
  const { newConversation } = store.useConversation();
  const { refreshConversations } = store.useConversations();

  const deleteConvoMutation = useDeleteConversationMutation(conversationId);

  useEffect(() => {
    if (deleteConvoMutation.isSuccess) {
      if (currentConversation?.conversationId == conversationId) newConversation();

      refreshConversations();
      retainView();
    }
  }, [deleteConvoMutation.isSuccess]);

  const clickHandler = () => {
    deleteConvoMutation.mutate({ conversationId, source: 'button' });
  };

  const handler = renaming ? cancelHandler : clickHandler;

  return (
    <button className="p-1 hover:text-white" onClick={handler}>
      {renaming ? <CrossIcon /> : <TrashIcon />}
    </button>
  );
}
