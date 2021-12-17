import { FC } from 'react';

import Logo from '@components/Logo/Logo';
import { SearchBar } from '@components/Inputs';
import { UserDropdownToggle } from '@components/Buttons';
import { ActivityDropdownToggle } from '@components/Buttons';
import { ThemeToggle } from '@components/Buttons';

interface MainNavigationBarProps {}

const MainNavigationBar: FC<MainNavigationBarProps> = () => {
  return (
    <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
      <Logo />

      <div className="flex justify-between items-center">
        <div className="mr-16">
          <SearchBar />
        </div>

        <div className="space-x-5">
          <ActivityDropdownToggle
            onClickHandler={() => console.log('toggle activity')}
          />

          <UserDropdownToggle
            onClickHandler={() => console.log('toggle user')}
          />

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MainNavigationBar;
