import { FC, useState, ReactChild, useEffect } from 'react';

import { MainNavigationBar } from '@components/NavigationBars';
import { MainSideBar } from '@components/NavigationBars';
import { MainFooter } from '@components/Footers';
import { DriveSideBar } from '@components/NavigationBars';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
interface MainLayoutProps {
  children: ReactChild | ReactChild[];
  activePod: string;
  deletePod?: () => void;
  refreshDrive?: () => void;
  refreshPods?: () => void;
}

const MainLayout: FC<MainLayoutProps> = ({
  children,
  activePod,
  deletePod,
  refreshDrive,
  refreshPods,
}) => {
  const [showDriveSideBar, setShowDriveSideBar] = useState(false);
  const { isLoggedIn } = useFdpStorage();

  const driveSideBarToggle = () => {
    setShowDriveSideBar(!showDriveSideBar);
  };

  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      // Always do navigations after the first render
      router.push('/');
    }
  }, []);

  return (
    <div className="flex flex-col justify-items-stretch items-center w-screen h-screen dark:bg-color-shade-black-night">
      <div className="w-full h-20 dark:bg-color-shade-dark-3-night">
        <MainNavigationBar />
      </div>

      <div className="flex justify-items-stretch items-stretch w-full h-full overflow-hidden">
        <div className="w-28 dark:bg-color-shade-dark-3-night z-10">
          <MainSideBar
            activePod={activePod}
            deletePod={deletePod}
            driveSideBarToggle={driveSideBarToggle}
            refreshDrive={refreshDrive}
            refreshPods={refreshPods}
          />
        </div>

        <div
          className={`w-full ${
            !showDriveSideBar
              ? 'py-5 px-8 overflow-scroll no-scroll-bar z-0'
              : ''
          }`}
        >
          <div className="flex justify-start items-stretch w-full h-full">
            {showDriveSideBar ? <DriveSideBar /> : null}
            <div className="w-full pt-5 px-8 overflow-scroll no-scroll-bar">
              {children}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full h-20 dark:bg-color-shade-dark-3-night z-10">
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
