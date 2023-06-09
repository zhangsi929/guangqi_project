import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDocumentTitle from 'src/hooks/useDocumentTitle';
import SunIcon from '../svg/SunIcon';
import LightningIcon from '../svg/LightningIcon';
import CautionIcon from '../svg/CautionIcon';
import store from 'src/store';

export default function Landing() {
  const [showingTemplates, setShowingTemplates] = useState(false);
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const { title = '新对话' } = conversation || {};

  useDocumentTitle(title);

  const clickHandler = (e) => {
    e.preventDefault();
    const { innerText } = e.target;
    const quote = innerText.split('"')[1].trim();
    setText(quote);
  };

  const showTemplates = (e) => {
    e.preventDefault();
    setShowingTemplates(!showingTemplates);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1
          id="landing-title"
          className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
        >
          {process.env.NEXT_PUBLIC_TITLE || 'ChatGPT Clone'}
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <SunIcon />
              您可以这样问
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;可以帮我写一份入团申请书吗&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;请帮我制定一个国庆假期去九寨沟的旅游计划&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;请用python程序解决鸡兔同笼问题&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;你是现在最红的饶舌歌手，请创作一首 Rap，主题是母亲节&quot; →
              </button>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <LightningIcon />
              我具备的能力
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                可以记住我们的对话，并根据上下文进行回复
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                我如果出错了您可以指正我，我会尽量改正
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                自动过滤有害信息，保护您的隐私
              </li>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <CautionIcon />
              注意事项
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                虽然ChatGPT非常强大在回答问题和提供信息方面通常都很准确。不要依赖此作为您的唯一信息源，特别是在涉及重要决策时。对于医疗、法律等专业领域的问题，建议您咨询相关领域的专家。
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                虽然ChatGPT是一个人工智能，但它的用途应该始终符合适当的行为规范。恶意使用，滥用或其他不适当的行为可能会导致您的使用权限被剥夺。
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                虽然ChatGPT能够模拟真人对话，但它不能提供专业的心理健康支持。如果您正在经历危机或心理困扰，建议您联系专业的心理健康服务。
              </li>
            </ul>
          </div>
        </div>
        {/* {!showingTemplates && (
          <div className="mt-8 mb-4 flex flex-col items-center gap-3.5 md:mt-16">
            <button
              onClick={showTemplates}
              className="btn btn-neutral justify-center gap-2 border-0 md:border"
            >
              <ChatIcon />
              Show Prompt Templates
            </button>
          </div>
        )}
        {!!showingTemplates && <Templates showTemplates={showTemplates}/>} */}
        <div className="group h-32 w-full flex-shrink-0 dark:border-gray-900/50 dark:bg-gray-800 md:h-48" />
      </div>
    </div>
  );
}
