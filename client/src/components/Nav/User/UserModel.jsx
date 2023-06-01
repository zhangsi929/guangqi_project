/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:55:49
 * @LastEditTime: 2023-05-31 21:51:05
 * @FilePath: /guangqi/client/src/components/Nav/User/UserModel.jsx
 * @Description:
 *
 * 我的账户
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useState, useEffect } from 'react';
import { Dialog, DialogButton } from 'src/components/ui/Dialog.tsx';
import DialogTemplate from 'src/components/ui/DialogTemplate.jsx';
import { Label } from 'src/components/ui/Label.tsx';
import { useGetUserStatsQuery } from 'src/data-provider';

const ClearConvos = ({ open, onOpenChange }) => {
  const getUserStatsQuery = useGetUserStatsQuery();
  const { data, error, isLoading } = getUserStatsQuery;
  const membership_map = {
    0: '专属内测',
    1: 'GPT黄金会员',
    2: 'GPT白金会员',
    3: 'GPT星钻会员'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTemplate
        title="我的账户"
        className="max-w-full sm:max-w-2xl"
        main={
          <div className="flex w-full flex-col items-center gap-6">
            <div className="grid w-full gap-6 sm:grid-cols-2">
              <div className="col-span-1 flex flex-col items-start justify-start gap-2">
                <Label htmlFor="type" className="text-left text-sm font-medium">
                  用户名: {data?.name}
                </Label>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-start gap-2">
                <Label htmlFor="type" className="text-left text-sm font-medium">
                  邮箱: {data?.email}
                </Label>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-start gap-2">
                <Label htmlFor="filename" className="text-left text-sm font-medium">
                  已使用对话次数: {data?.used_api}
                </Label>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-start gap-2">
                <Label htmlFor="type" className="text-left text-sm font-medium">
                  剩余对话次数: {data?.api_balance}
                </Label>
              </div>
              <div className="col-span-1 flex flex-col items-start justify-start gap-2">
                <Label htmlFor="type" className="text-left text-sm font-medium">
                  会员: {membership_map[data?.membership_level]}
                </Label>
              </div>
            </div>
          </div>
        }
        selection={null}
      />
    </Dialog>
  );
};

export default ClearConvos;
