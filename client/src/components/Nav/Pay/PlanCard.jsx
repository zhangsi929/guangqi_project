/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-07 17:57:05
 * @LastEditTime: 2023-06-07 19:05:19
 * @FilePath: /guangqi/client/src/components/Nav/Pay/PlanCard.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { Dialog, DialogTrigger, DialogButton } from 'src/components/ui/Dialog.tsx';
import { FaCheckCircle } from 'react-icons/fa';

const PLANS = {
  planA: {
    title: '初级版Basic',
    description: [
      'ChaGPT智能对话服务-gpt3.5 (xxxx次额度每月)',
      '联系上下文语境并连续对话',
      '将ChatGPT对话记录下载保存本地',
      '对话搜索功能'
    ],
    price: 'x/月'
  },
  planB: {
    title: '高级版Plus',
    description: [
      'ChaGPT智能对话服务-gpt3.5 (xxxx次额度每月)',
      '联系上下文语境并连续对话',
      '将ChatGPT对话记录下载保存本地',
      '对话搜索功能'
    ],
    price: 'x/月'
  },
  planC: {
    title: '专业版PRO',
    description: [
      'ChaGPT智能对话服务-gpt3.5 (xxxx次额度每月)',
      '联系上下文语境并连续对话',
      '将ChatGPT对话记录下载保存本地',
      '对话搜索功能'
    ],
    price: 'x/月'
  }
};

const PlanCard = ({ planId, onClick }) => {
  const { title, description, price } = PLANS[planId];
  return (
    <div className="flex flex-col item-left bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description.map((desc, index) => (
        <div key={index} className="flex items-start mb-2">
          <FaCheckCircle className={index < 3 ? 'text-green-500 mr-2' : 'text-gray-500 mr-2'} />
          <p className="text-gray-600">{desc}</p>
        </div>
      ))}
      <p className="text-blue-500 text-lg font-bold mb-4">{price}</p>
      <DialogButton onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
        购买
      </DialogButton>
    </div>
  );
};

export default PlanCard;
