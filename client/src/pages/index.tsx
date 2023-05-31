/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:45:41
 * @LastEditTime: 2023-05-30 21:48:56
 * @FilePath: /guangqi/client/src/pages/index.tsx
 * @Description:
 *
 * Root will go to /chat/new
 * we can also use getStaticProps which means we will pre-render the page at build time.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import LandingPage from '../components/Landing/landing';

export default function HomePage() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push('/chat/new');
  // }, [router]);
  return <LandingPage />;
}
