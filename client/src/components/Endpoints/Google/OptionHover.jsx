/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 20:29:19
 * @FilePath: /guangqi/client/src/components/Endpoints/Google/OptionHover.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React from 'react';
import { HoverCardPortal, HoverCardContent } from 'src/components/ui/HoverCard.tsx';

const types = {
  temp: '这个参数影响模型生成文本的随机性。如果你把它设得高一些，生成的文本就会更有想象力；而如果设得低，那么生成的文本就会更符合真相，更有针对性。建议你在这个参数和Top P之间选择一个进行调整，而不是同时调整两个，因为他们是相似的功能。',
  topp: '当设置 Top P 为较高的值如0.9时，你得到的结果会更具有多样性，有更多的可能性和创新性。如果设置 Top P 为较低的值如0.1，你得到的结果会更加确定，更有针对性，因为模型的选择范围变小了。但这可能会导致输出的多样性和创新性较低。',
  topk: '这个参数也决定了模型如何选择输出的内容。如果你把Top K设为1，那么模型会选择最可能的那个选项。而如果你把Top K设为3，那么模型会在最可能的3个选项中选择一个。',
  maxoutputtokens:
    ' 	Maximum number of tokens that can be generated in the response. Specify a lower value for shorter responses and a higher value for longer responses.'
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
