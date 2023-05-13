/**
 * _app.tsx: The _app.tsx file (or _app.js for JavaScript) is a custom App component 
 * that allows you to override the default Next.js behavior for initializing pages. 
 * You can use it to add global styles, share state between pages, or inject additional props to every page. 
 * This file is optional; however, if you need any of the mentioned functionality, you should create and use this file. 
 * The naming convention for this file is important, and it should be named _app.tsx (or _app.js for JavaScript).
 */
import React from 'react';
import { AppProps } from 'next/app';
import 'fontsource-roboto';
import '../../styles/styles.css';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default CustomApp;
