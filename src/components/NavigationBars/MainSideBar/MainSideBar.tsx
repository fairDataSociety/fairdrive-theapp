import { FC, useEffect, useState } from 'react';
import router from 'next/router';

import classes from './MainSideBar.module.scss';
import DriveActionBarMobile from '../DriveActionBar/DriveActionBarMobile';
import { UpdateDriveProps } from '@interfaces/handlers';
import NavigationItems from './NavigationItems';

interface MainSideBarProps extends UpdateDriveProps {
  driveSideBarToggle: any;
  refreshPods?: () => void;
  onOptionClick?: () => void;
}

const MainSideBar: FC<MainSideBarProps> = ({
  driveSideBarToggle,
  updateDrive,
  refreshPods,
  onOptionClick,
}) => {
  const [renderDriveMenu, setRenderDriveMenu] = useState<boolean>(false);

  useEffect(() => {
    setRenderDriveMenu(Boolean(router.pathname === '/drive' && updateDrive));
  }, [updateDrive]);

  return (
    <div
      className={`${classes.sideBar} flex flex-row overflow-x-auto sm:overflow-x-visible sm:flex-col sm:justify-start sm:items-center w-full sm:h-full
      bg-color-shade-dark-3-day dark:bg-color-shade-dark-3-night`}
    >
      <NavigationItems
        className="hidden sm:block"
        driveSideBarToggle={driveSideBarToggle}
        onOptionClick={onOptionClick}
      />

      {renderDriveMenu && (
        <DriveActionBarMobile
          updateDrive={updateDrive}
          refreshPods={refreshPods}
        />
      )}
    </div>
  );
};

export default MainSideBar;
