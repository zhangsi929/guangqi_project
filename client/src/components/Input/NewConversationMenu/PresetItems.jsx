/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 00:32:55
 * @FilePath: /guangqi/client/src/components/Input/NewConversationMenu/PresetItems.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React from 'react';
import PresetItem from './PresetItem.jsx';

export default function PresetItems({ presets, onSelect, onChangePreset, onDeletePreset }) {
  return (
    <>
      {Array.isArray(presets) &&
        presets.map((preset) => (
          <PresetItem
            key={preset?.presetId}
            value={preset}
            onSelect={onSelect}
            onChangePreset={onChangePreset}
            onDeletePreset={onDeletePreset}
            preset={preset}
          />
        ))}
    </>
  );
}
