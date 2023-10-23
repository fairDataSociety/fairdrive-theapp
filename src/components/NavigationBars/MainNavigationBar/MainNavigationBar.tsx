import { FC, useContext, useState } from 'react';

import { useFdpStorage } from '@context/FdpStorageContext';

import Logo from '@components/Logo/Logo';
import { SearchBar } from '@components/Inputs';
import { Button, UserDropdownToggle } from '@components/Buttons';
// import { ActivityDropdownToggle } from '@components/Buttons';
import UserDropdown from './UserDropdown/UserDropdown';
import UserContext from '@context/UserContext';
import LanguageDropdown from '@components/Dropdowns/LanguageDropdown/LanguageDropdown';
import { useDialogs } from '@context/DialogsContext';

import NavigationMenuLight from '@media/UI/drive-view-list-light.svg';
import NavigationMenuDark from '@media/UI/drive-view-list-dark.svg';
import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';
import { Transition } from '@headlessui/react';

// import ActivityDropdown from './ActivityDropdown/ActivityDropdown';

const MainNavigationBar: FC<Record<string, never>> = () => {
  const { theme } = useContext(ThemeContext);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { wallet } = useFdpStorage();
  const { metamaskMigrationNotification } = useContext(UserContext);
  const { setMobileNavigationOpen } = useDialogs();
  const { activePod } = useContext(PodContext);

  return (
    <nav>
      <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
        <div className="flex items-center">
          <Button
            onClick={() => setMobileNavigationOpen(true)}
            variant="tertiary"
            className="cursor-pointer block md:hidden"
            icon={
              theme === 'light' ? (
                <NavigationMenuLight className="inline-block" />
              ) : (
                <NavigationMenuDark className="inline-block" />
              )
            }
          />
          <Logo />
        </div>

        <div className="flex justify-between items-center">
          <div className="hidden sm:block mr-16">
            <Transition
              show={Boolean(activePod)}
              enter="transition ease duration-700 transform"
              enterFrom="opacity-0 -translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease duration-1000 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-full"
            >
              <SearchBar />
            </Transition>
          </div>
          <div className="flex flex-nowrap space-x-5">
            <UserDropdownToggle
              address={wallet?.address || 'Blossom'}
              onClickHandler={() => setShowUserDropdown(true)}
              showNotification={metamaskMigrationNotification === 'closed'}
            />
            <LanguageDropdown />
          </div>
        </div>
      </div>

      <UserDropdown
        showDropdown={showUserDropdown}
        setShowDropdown={setShowUserDropdown}
      />

      {/* <ActivityDropdown
        showDropdown={showActivityDropdown}
        setShowDropdown={setShowActivityDropdown}
      /> */}
    </nav>
  );
};

export default MainNavigationBar;
