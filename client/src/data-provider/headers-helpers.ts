/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-23 22:59:58
 * @FilePath: /guangqi/client/src/data-provider/headers-helpers.ts
 * @Description: 
 * 
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved. 
 */
import axios from './axios';
export function setAcceptLanguageHeader(value: string): void {
  axios.defaults.headers.common['Accept-Language'] = value;
}

export function setTokenHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
