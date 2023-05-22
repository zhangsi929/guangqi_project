/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:45:41
 * @LastEditTime: 2023-05-21 00:28:13
 * @FilePath: /guangqi/client/src/pages/index.tsx
 * @Description:
 * 
 * Root will go to /chat/new
 * we can also use getStaticProps which means we will pre-render the page at build time.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useRouter } from 'next/router'

export default function HomePage() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push('/chat/new');
  }

  return (
    <div>
      <h1>Welcome to Our Chat Application!</h1>
      <button onClick={handleStartChat}>Start Chat</button>
    </div>
  )
}

