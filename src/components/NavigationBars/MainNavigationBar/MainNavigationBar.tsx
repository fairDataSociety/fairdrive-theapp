import { FC, useState } from 'react';

import { useFdpStorage } from '@context/FdpStorageContext';

import Logo from '@components/Logo/Logo';
import { SearchBar } from '@components/Inputs';
import { UserDropdownToggle } from '@components/Buttons';
// import { ActivityDropdownToggle } from '@components/Buttons';
import UserDropdown from './UserDropdown/UserDropdown';
// import ActivityDropdown from './ActivityDropdown/ActivityDropdown';

const MainNavigationBar: FC<Record<string, never>> = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { wallet } = useFdpStorage();
  return (
    <nav>
      <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
        <Logo />

        <div className="flex justify-between items-center">
          <div className="hidden sm:block mr-16">
            <SearchBar />
          </div>

          <div className="flex flex-nowrap space-x-5">
            <UserDropdownToggle
              address={wallet?.address}
              onClickHandler={() => setShowUserDropdown(true)}
            />
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
