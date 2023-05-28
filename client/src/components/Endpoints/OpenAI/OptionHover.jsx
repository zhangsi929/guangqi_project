/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 20:48:47
 * @FilePath: /guangqi/client/src/components/Endpoints/OpenAI/OptionHover.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React from 'react';
import { HoverCardPortal, HoverCardContent } from 'src/components/ui/HoverCard.tsx';

const types = {
  temp: '如果你调高这个值，程序的输出结果就会更随机；调低这个值，程序的输出就会更集中，更确定。建议你调整这个值或者 Top P，但不建议同时调整两者。',
  max: '这个参数表示你想让程序最多生成多少个汉子。输入的单词数量加上生成的单词数量不能超过模型的最大限制。',
  topp: '同样影响输出内容的多样性和想象力。建议你调整这个值或者 temperature，但不建议同时调整两者。',
  freq: '数值调高这样可以降低程序重复同一句话的可能性',
  pres: '数值调高可以增加程序谈论新话题的可能性'
};

function OptionHover({ type, side }) {
  // const options = {};
  // if (type === 'pres') {
  //   options.sideOffset = 45;
  // }

  return (
    <HoverCardPortal>
      <HoverCardContent
        side={side}
        className="w-80 "
        // {...options}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">{types[type]}</p>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  );
}

export default OptionHover;
