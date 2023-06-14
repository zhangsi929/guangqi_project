/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-13 22:08:15
 * @LastEditTime: 2023-06-13 22:43:32
 * @FilePath: /guangqi/client/src/pages/_document.tsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          {/* other head elements as necessary */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
