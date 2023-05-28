/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 20:13:14
 * @FilePath: /guangqi/client/src/components/Endpoints/SaveAsPresetDialog.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import DialogTemplate from '../ui/DialogTemplate';
import { Dialog } from '../ui/Dialog.tsx';
import { Input } from '../ui/Input.tsx';
import { Label } from '../ui/Label.tsx';
import { cn } from 'src/utils/';
import cleanupPreset from 'src/utils/cleanupPreset';
import { useCreatePresetMutation } from 'src/data-provider';
import store from 'src/store';

const SaveAsPresetDialog = ({ open, onOpenChange, preset }) => {
  const [title, setTitle] = useState(preset?.title || 'My Preset');
  const endpointsConfig = useRecoilValue(store.endpointsConfig);
  const createPresetMutation = useCreatePresetMutation();

  const defaultTextProps =
    'rounded-md border border-gray-300 bg-transparent text-sm shadow-[0_0_10px_rgba(0,0,0,0.10)] outline-none placeholder:text-gray-400 focus:outline-none focus:ring-gray-400 focus:ring-opacity-20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-400 dark:bg-gray-700 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0';

  const submitPreset = () => {
    const _preset = cleanupPreset({
      preset: {
        ...preset,
        title
      },
      endpointsConfig
    });
    createPresetMutation.mutate(_preset);
  };

  useEffect(() => {
    setTitle(preset?.title || 'My Preset');
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTemplate
        title=""
        main={
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="chatGptLabel" className="text-left text-sm font-medium">
              方案名称
            </Label>
            <Input
              id="chatGptLabel"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value || '')}
              placeholder="Set a custom name, in case you can find this preset"
              className={cn(
                defaultTextProps,
                'flex h-10 max-h-10 w-full resize-none px-3 py-2 focus:outline-none focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0'
              )}
            />
          </div>
        }
        selection={{
          selectHandler: submitPreset,
          selectClasses: 'bg-green-600 hover:bg-green-700 dark:hover:bg-green-800 text-white',
          selectText: '保存'
        }}
      />
    </Dialog>
  );
};

export default SaveAsPresetDialog;
