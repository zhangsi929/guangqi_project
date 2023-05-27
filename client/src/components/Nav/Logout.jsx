/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 19:51:25
 * @LastEditTime: 2023-05-27 02:26:24
 * @FilePath: /guangqi/client/src/components/Nav/Logout.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { forwardRef } from 'react';
import LogOutIcon from '../svg/LogOutIcon';
import { useAuthContext } from 'src/hooks/AuthContext';

const Logout = forwardRef(() => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700"
      onClick={handleLogout}
    >
      <LogOutIcon />
      {user?.username || 'USER'}
      <small>退出登陆</small>
    </button>
  );
});

export default Logout;
