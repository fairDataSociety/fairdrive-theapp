import { FC, useContext } from 'react';
import router from 'next/router';

import UserContext from '@context/UserContext';
import { ThemeToggle } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import PodContext from '@context/PodContext';
import shortenString from '@utils/shortenString';
import CopyIcon from '@media/UI/copy.svg';
import copy from 'copy-to-clipboard';
import { useDialogs } from '@context/DialogsContext';
import Indicator from '@components/Indicator/Indicator';

interface UserDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (showModal: boolean) => void;
}

const UserDropdown: FC<UserDropdownProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  const { user, setUser, metamaskMigrationNotification, address } =
    useContext(UserContext);
  const { setIsLoggedIn, setFdpStorageType, setWallet, setLoginType } =
    useFdpStorage();
  const { clearPodContext } = useContext(PodContext);
  const { setMetamaskMigrationOpen } = useDialogs();

  const handleCopyClick = async () => {
    copy(user || address);
  };

  const disconnect = async () => {
    setUser(null);
    setFdpStorageType('native');
    setIsLoggedIn(false);
    setLoginType(null);
    setWallet(null);
    clearPodContext();
    setTimeout(() => router.push('/'));
  };

  const onMigrateClick = () => {
    setMetamaskMigrationOpen(true);
    setShowDropdown(false);
  };

  return (
    <>
      <div
        className={`${showDropdown ? 'block' : 'hidden'} inset-0 fixed z-50`}
        onClick={() => setShowDropdown(false)}
      >
        <div className="relative w-full h-20 mx-auto">
          <div
            className="absolute top-14 right-16 w-72 py-4 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow-md rounded border border-color-shade-black-day dark:border-color-shade-light-3-day"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-5 mr-5 mb-5 flex content-center items-center border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night dark:text-color-shade-white-night">
              <div title={user || address}>
                {user || shortenString(address, 24, 9)}
              </div>
              <div className="ml-auto">
                <button
                  className="cursor-pointer"
                  onClick={() => handleCopyClick()}
                >
                  <CopyIcon className="inline-block" />
                </button>
              </div>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>

            <div>
              {metamaskMigrationNotification === 'closed' && (
                <div
                  className="mb-4 text-color-shade-dark-3-night dark:text-color-shade-dark-4-day  cursor-pointer"
                  onClick={onMigrateClick}
                >
                  Migrate Account
                  <Indicator className="inline-block ml-2" />
                </div>
              )}
              <div
                className="mb-4 text-color-status-negative-day cursor-pointer"
                onClick={disconnect}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
