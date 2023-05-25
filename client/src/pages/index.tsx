/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:45:41
 * @LastEditTime: 2023-05-23 01:04:59
 * @FilePath: /guangqi/client/src/pages/index.tsx
 * @Description:
 *
 * Root will go to /chat/new
 * we can also use getStaticProps which means we will pre-render the page at build time.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push('/chat/new');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        background: '#f5f5f5'
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>搭建中</h1>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          background: '#0070f3',
          color: 'white'
        }}
        onClick={handleStartChat}
      >
        预览界面
      </button>
    </div>
  );
}
