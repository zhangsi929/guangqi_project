/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 00:43:07
 * @LastEditTime: 2023-05-22 22:50:10
 * @FilePath: /guangqi/client/src/routes/Root.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import MessageHandler from '../components/MessageHandler';
import Nav from '../components/Nav';
import MobileNav from '../components/Nav/MobileNav';
import {
  useGetSearchEnabledQuery,
  useGetEndpointsQuery,
  useGetPresetsQuery
} from '../data-provider';
import store from '../store';
import { useSetRecoilState } from 'recoil';
import { useAuthContext } from '../hooks/AuthContext';
import { AppProps } from 'next/app';
// type RootProps = {
//   Component: AppProps["Component"];
//   pageProps: AppProps["pageProps"];
// };

export default function Root({ Component, pageProps }) {
  const [navVisible, setNavVisible] = useState(false);

  const setIsSearchEnabled = useSetRecoilState(store.isSearchEnabled);
  const setEndpointsConfig = useSetRecoilState(store.endpointsConfig);
  const setPresets = useSetRecoilState(store.presets);
  const { user } = useAuthContext();

  const searchEnabledQuery = useGetSearchEnabledQuery();
  const endpointsQuery = useGetEndpointsQuery();
  const presetsQuery = useGetPresetsQuery({ enabled: !!user });

  useEffect(() => {
    if (endpointsQuery.data) {
      setEndpointsConfig(endpointsQuery.data);
    } else if (endpointsQuery.isError) {
      console.error('Failed to get endpoints', endpointsQuery.error);
    }
  }, [endpointsQuery.data, endpointsQuery.isError]);

  useEffect(() => {
    if (presetsQuery.data) {
      setPresets(presetsQuery.data);
    } else if (presetsQuery.isError) {
      console.error('Failed to get presets', presetsQuery.error);
    }
  }, [presetsQuery.data, presetsQuery.isError]);

  useEffect(() => {
    if (searchEnabledQuery.data) {
      setIsSearchEnabled(searchEnabledQuery.data);
    } else if (searchEnabledQuery.isError) {
      console.error('Failed to get search enabled', searchEnabledQuery.error);
    }
  }, [searchEnabledQuery.data, searchEnabledQuery.isError]);

  return (
    <>
      <div className="flex h-screen">
        <Nav navVisible={navVisible} setNavVisible={setNavVisible} />
        <div className="flex h-full w-full flex-1 flex-col bg-gray-50">
          <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden bg-white pt-10 dark:bg-gray-800 md:pt-0">
            <MobileNav setNavVisible={setNavVisible} />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      <MessageHandler />
    </>
  );
}
