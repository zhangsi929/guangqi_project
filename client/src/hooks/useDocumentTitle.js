/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 18:07:21
 * @LastEditTime: 2023-05-22 22:49:03
 * @FilePath: /guangqi/client/src/hooks/useDocumentTitle.js
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
// useDocumentTitle.js
import { useRef, useEffect } from 'react';

function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect(
  //   () => () => {
  //     if (!prevailOnUnmount) {
  //       document.title = defaultTitle.current;
  //     }
  //   }, []
  // );
}

export default useDocumentTitle;
