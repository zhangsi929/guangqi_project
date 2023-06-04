/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-03 18:35:43
 * @LastEditTime: 2023-06-03 21:34:00
 * @FilePath: /guangqi/client/src/store/apiUsage.js
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
// create a new store instance. which is used for recording the count of api usage
import { atom, useRecoilState } from 'recoil';

export const apiBalance = atom({
  key: 'apiBalance',
  default: 0
});

export const useApiBalance = () => {
  const [balance, setBalance] = useRecoilState(apiBalance);

  const getBalance = () => balance;

  const saveBalance = (value) => {
    setBalance(value);
  };

  const decrementBalance = () => {
    setBalance(balance - 1);
  };

  return { balance: getBalance(), getBalance, saveBalance, decrementBalance };
};

// another atom used to show a modal to let user buy more api usage when the balance is 0
export const showBuyModal = atom({
  key: 'showBuyModal',
  default: false
});

export const useShowBuyModal = () => {
  const [show, setShow] = useRecoilState(showBuyModal);

  const getShow = () => show;

  const saveShow = (value) => {
    setShow(value);
  };

  return { show: getShow(), getShow, saveShow };
};
