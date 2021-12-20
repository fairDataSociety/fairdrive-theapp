import { FC, useState, ReactChild } from 'react';

import { MainNavigationBar } from '@components/NavigationBars';
import { MainSideBar } from '@components/NavigationBars';
import { MainFooter } from '@components/Footers';
import { DriveSideBar } from '@components/NavigationBars';

interface MainLayoutProps {
  children: ReactChild | ReactChild[];
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [showDriveSideBar, setShowDriveSideBar] = useState(false);

  const driveSideBarToggle = () => {
    setShowDriveSideBar(!showDriveSideBar);
  };

  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen dark:bg-color-shade-dark-3-night">
      <div className="w-full h-20 dark:bg-color-shade-dark-3-night z-10">
        <MainNavigationBar />
      </div>

      <div className="flex justify-items-stretch items-stretch w-full h-full">
        <div className="w-28 dark:bg-color-shade-dark-3-night z-10">
          <MainSideBar driveSideBarToggle={driveSideBarToggle} />
        </div>
        <div
          className={`w-full ${
            !showDriveSideBar ? 'py-5 px-8 overflow-scroll z-0' : ''
          }`}
        >
          {showDriveSideBar ? (
            <div className="flex justify-start items-stretch w-full h-full">
              <DriveSideBar />
              <div className="w-full py-5 px-8">{children}</div>
            </div>
          ) : (
            children
          )}
        </div>
      </div>

      <div className="w-full h-20 dark:bg-color-shade-dark-3-night z-10">
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
