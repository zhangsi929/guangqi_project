/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 19:41:06
 * @FilePath: /guangqi/client/src/components/Endpoints/EndpointOptionsDialog.jsx
 * @Description:
 *
 * 点击保存preset 跳出来的那个
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import exportFromJSON from 'export-from-json';
import DialogTemplate from '../ui/DialogTemplate.jsx';
import { Dialog, DialogButton } from '../ui/Dialog.tsx';
import SaveAsPresetDialog from './SaveAsPresetDialog';
import cleanupPreset from 'src/utils/cleanupPreset';

import Settings from './Settings';

import store from 'src/store';

// A preset dialog to show readonly preset values.
const EndpointOptionsDialog = ({ open, onOpenChange, preset: _preset, title }) => {
  const [preset, setPreset] = useState(_preset);
  const [endpointName, setEndpointName] = useState(preset?.endpoint);

  const [saveAsDialogShow, setSaveAsDialogShow] = useState(false);
  const endpointsConfig = useRecoilValue(store.endpointsConfig);

  if (endpointName === 'google') {
    setEndpointName('PaLM');
  }

  const setOption = (param) => (newValue) => {
    let update = {};
    update[param] = newValue;
    setPreset((prevState) => ({
      ...prevState,
      ...update
    }));
  };

  const saveAsPreset = () => {
    setSaveAsDialogShow(true);
  };

  const exportPreset = () => {
    exportFromJSON({
      data: cleanupPreset({ preset, endpointsConfig }),
      fileName: `${preset?.title}.json`,
      exportType: exportFromJSON.types.json
    });
  };

  useEffect(() => {
    setPreset(_preset);
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTemplate
          title={`${title || 'View Options'} - ${endpointName}`}
          className="max-w-full sm:max-w-4xl"
          main={
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-full p-0">
                <Settings preset={preset} readonly={true} setOption={setOption} />
              </div>
            </div>
          }
          buttons={
            <>
              <DialogButton
                onClick={saveAsPreset}
                className="dark:hover:gray-400 border-gray-700 bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-800"
              >
                保存我的个性化方案
              </DialogButton>
            </>
          }
          leftButtons={
            <>
              <DialogButton onClick={exportPreset} className="dark:hover:gray-400 border-gray-700">
                Export
              </DialogButton>
            </>
          }
        />
      </Dialog>
      <SaveAsPresetDialog
        open={saveAsDialogShow}
        onOpenChange={setSaveAsDialogShow}
        preset={preset}
      />
    </>
  );
};

export default EndpointOptionsDialog;
