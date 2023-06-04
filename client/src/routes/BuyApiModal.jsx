/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-03 22:07:04
 * @LastEditTime: 2023-06-03 22:36:04
 * @FilePath: /guangqi/client/src/routes/BuyApiModal.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React from 'react';
import { useShowBuyModal } from 'src/store/apiUsage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'src/components/ui/Dialog';

export const BuyApiModal = () => {
  const { show, saveShow } = useShowBuyModal();

  const handleClose = () => {
    saveShow(false);
  };

  return (
    show && (
      <Dialog open>
        <DialogContent onClose={handleClose}>
          <DialogHeader>
            <DialogTitle>亲，您的对话额度已使用完毕</DialogTitle>
            <DialogDescription>
              非常感谢您选择我们的服务，您的满意就是我们的目标。账户需要充值哦，这样我们就可以给您提供更多好服务啦。感谢亲的支持~
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Here you can add buttons or other elements for your modal. */}
            <DialogClose onClick={handleClose}>关闭</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};
