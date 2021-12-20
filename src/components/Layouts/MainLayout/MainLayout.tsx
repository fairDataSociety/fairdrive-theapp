import { FC, ReactChild } from 'react';

import { MainNavigationBar } from '@components/NavigationBars';
import { MainSideBar } from '@components/NavigationBars';
import { MainFooter } from '@components/Footers';

interface MainLayoutProps {
  children: ReactChild | ReactChild[];
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen dark:bg-color-shade-dark-3-night">
      <div className="w-full h-20 dark:bg-color-shade-dark-3-night">
        <MainNavigationBar />
      </div>

      <div className="flex justify-items-stretch items-stretch w-full h-full">
        <div className="w-28 dark:bg-color-shade-dark-3-night">
          <MainSideBar />
        </div>
        <div className="w-full py-5 px-8 overflow-scroll">{children}</div>
      </div>

      <div className="w-full h-20 dark:bg-color-shade-dark-3-night">
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
