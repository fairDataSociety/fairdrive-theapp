import { FC, ReactChild, useEffect, useMemo, useState } from 'react';
import {
  DriveSideBar,
  MainNavigationBar,
  MainSideBar,
} from '@components/NavigationBars';
import { motion } from 'framer-motion';
import { MainFooter } from '@components/Footers';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
import { UpdateDriveProps } from '@interfaces/handlers';
import { getInvite } from '@utils/invite';
import DisclaimerMessage, {
  IconType,
} from '@components/DisclaimerMessage/DisclaimerMessage';
import { useLocales } from '@context/LocalesContext';

interface MainLayoutProps extends UpdateDriveProps {
  children: ReactChild | ReactChild[];
  refreshPods?: () => void;
}

const MainLayout: FC<MainLayoutProps> = ({
  children,
  updateDrive,
  refreshPods,
}) => {
  const [showDriveSideBar, setShowDriveSideBar] = useState(false);
  const { isLoggedIn, loginType } = useFdpStorage();
  const inviteKey = useMemo(() => getInvite(), []);
  const { intl } = useLocales();

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

      <div className="flex flex-col sm:flex-row justify-items-stretch items-stretch w-full h-full overflow-hidden">
        <div className="sm:w-28 dark:bg-color-shade-dark-3-night">
          <MainSideBar
            driveSideBarToggle={driveSideBarToggle}
            updateDrive={updateDrive}
            refreshPods={refreshPods}
          />
        </div>

        <div
          className={`w-full h-full ${
            !showDriveSideBar ? 'py-5 px-8 overflow-scroll no-scroll-bar' : ''
          }`}
        >
          <div className="flex justify-start items-stretch w-full h-full">
            {showDriveSideBar ? <DriveSideBar /> : null}
            <div className="w-full pt-5 pb-20 sm:mb-0 md:px-8 px-1 sm:px-5 overflow-scroll no-scroll-bar">
              {loginType === 'metamask' && inviteKey && (
                <DisclaimerMessage
                  text={intl.get('SIGN_UP_FOR_AN_FDS_ACCOUNT')}
                  icon={IconType.INFO}
                  url={`${process.env.NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT}/#/I_${inviteKey}`}
                />
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-full h-36 dark:bg-color-shade-dark-3-night">
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
