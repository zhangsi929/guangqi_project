/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 22:42:09
 * @LastEditTime: 2023-05-23 22:43:40
 * @FilePath: /guangqi/client/src/data-provider/axios.ts
 * @Description: 
 * 
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved. 
 */
import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default axiosInstance;