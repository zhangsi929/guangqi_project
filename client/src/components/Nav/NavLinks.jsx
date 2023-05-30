/* eslint-disable no-constant-condition */
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchBar from './SearchBar';
import TrashIcon from '../svg/TrashIcon';
import UserIcon from '../svg/UserIcon';
import { Download } from 'lucide-react';
import NavLink from './NavLink';
import ExportModel from './ExportConversation/ExportModel';
import UserModel from './User/UserModel';
import ClearConvos from './ClearConvos';
import DarkMode from './DarkMode';
import Logout from './Logout';
import UserDashboard from './UserDashBoard';
import { useAuthContext } from 'src/hooks/AuthContext';
import { cn } from 'src/utils/';
import DotsIcon from '../svg/DotsIcon';

import store from 'src/store';
import { on } from 'events';

export default function NavLinks({ clearSearch, isSearchEnabled }) {
  const [showExports, setShowExports] = useState(false);
  const [showClearConvos, setShowClearConvos] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const { user } = useAuthContext();

  const conversation = useRecoilValue(store.conversation) || {};

  const exportable =
    conversation?.conversationId &&
    conversation?.conversationId !== 'new' &&
    conversation?.conversationId !== 'search';

  const clickHandler = () => {
    if (exportable) setShowExports(true);
  };

  const clickHandlerUser = () => {
    setShowUser(true);
  };

  return (
    <>
      <Menu as="div" className="group relative">
        {({ open }) => (
          <>
            <Menu.Button
              className={cn(
                'group-ui-open:bg-gray-800 flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors duration-200 hover:bg-gray-800',
                open ? 'bg-gray-800' : ''
              )}
            >
              <div className="-ml-0.5 h-5 w-5 flex-shrink-0">
                <div className="relative flex">
                  <img
                    className="rounded-sm"
                    src={
                      user?.avatar || `https://avatars.dicebear.com/api/initials/${user?.name}.svg`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-white">
                {user?.name || 'USER'}
              </div>
              <DotsIcon />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute bottom-full left-0 z-20 mb-2 w-full translate-y-0 overflow-hidden rounded-md bg-[#050509] py-1.5 opacity-100 outline-none">
                {isSearchEnabled && (
                  <Menu.Item>
                    <SearchBar clearSearch={clearSearch} />
                  </Menu.Item>
                )}
                <Menu.Item as="div">
                  <NavLink
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700',
                      exportable ? 'cursor-pointer text-white' : 'cursor-not-allowed text-gray-400'
                    )}
                    svg={() => <Download size={16} />}
                    text="下载聊天记录"
                    clickHandler={clickHandler}
                  />
                </Menu.Item>
                <div className="my-1.5 h-px bg-white/20" role="none" />
                <Menu.Item as="div">
                  <DarkMode />
                </Menu.Item>
                <Menu.Item as="div">
                  <NavLink
                    className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700"
                    svg={() => <TrashIcon />}
                    text="清除对话"
                    clickHandler={() => setShowClearConvos(true)}
                  />
                </Menu.Item>
                <Menu.Item as="div">
                  <NavLink
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-700',
                      true ? 'cursor-pointer text-white' : 'cursor-not-allowed text-gray-400'
                    )}
                    svg={() => <UserIcon />}
                    text="我的账户 (开发中)"
                    clickHandler={clickHandlerUser}
                  />
                </Menu.Item>
                <div className="my-1.5 h-px bg-white/20" role="none" />
                <Menu.Item as="div">
                  <Logout />
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      {showUser && <UserModel open={showUser} onOpenChange={setShowUser} />}
      {showExports && <ExportModel open={showExports} onOpenChange={setShowExports} />}
      {showClearConvos && <ClearConvos open={showClearConvos} onOpenChange={setShowClearConvos} />}
    </>
  );
}
