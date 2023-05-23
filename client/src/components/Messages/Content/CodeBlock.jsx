/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 19:09:33
 * @LastEditTime: 2023-05-22 23:45:12
 * @FilePath: /guangqi/client/src/components/Messages/Content/CodeBlock.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
/* eslint-disable no-use-before-define */
import React, { useRef, useState } from 'react';
import Clipboard from 'src/components/svg/Clipboard';
import CheckMark from 'src/components/svg/CheckMark';

const CodeBlock = ({ lang, codeChildren }) => {
  const codeRef = useRef(null);

  return (
    <div className="rounded-md bg-black">
      <CodeBar lang={lang} codeRef={codeRef} />
      <div className="overflow-y-auto p-4">
        <code ref={codeRef} className={`hljs !whitespace-pre language-${lang}`}>
          {codeChildren}
        </code>
      </div>
    </div>
  );
};

const CodeBar = React.memo(({ lang, codeRef }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="relative flex items-center rounded-tl-md rounded-tr-md bg-gray-800 px-4 py-2 font-sans text-xs text-gray-200">
      <span className="">{lang}</span>
      <button
        className="ml-auto flex gap-2"
        onClick={async () => {
          const codeString = codeRef.current?.textContent;
          if (codeString)
            navigator.clipboard.writeText(codeString).then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            });
        }}
      >
        {isCopied ? (
          <>
            <CheckMark />
            Copied!
          </>
        ) : (
          <>
            <Clipboard />
            Copy code
          </>
        )}
      </button>
    </div>
  );
});
export default CodeBlock;
