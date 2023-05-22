/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-21 17:50:11
 * @LastEditTime: 2023-05-21 17:53:46
 * @FilePath: /guangqi/client/src/utils/index.jsx
 * @Description: 
 * 
 * This maybe related to the programming language block of the code editor
 * 
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved. 
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const languages = [
  'java',
  'c',
  'markdown',
  'css',
  'html',
  'xml',
  'bash',
  'json',
  'yaml',
  'jsx',
  'python',
  'c++',
  'javascript',
  'csharp',
  'php',
  'typescript',
  'swift',
  'objectivec',
  'sql',
  'r',
  'kotlin',
  'ruby',
  'go',
  'x86asm',
  'matlab',
  'perl',
  'pascal'
];
