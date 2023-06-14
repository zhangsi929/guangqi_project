/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-19 23:45:41
 * @LastEditTime: 2023-06-13 22:06:17
 * @FilePath: /guangqi/client/src/pages/index.tsx
 * @Description:
 *
 * Root will go to /chat/new
 * we can also use getStaticProps which means we will pre-render the page at build time.
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import LandingPage from '../components/Landing/landing';

export default function HomePage() {
  return <LandingPage />;
}
