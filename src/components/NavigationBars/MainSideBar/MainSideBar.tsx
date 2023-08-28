import { FC, useEffect, useState } from 'react';
import router from 'next/router';

import { MainSideBarItem } from '@components/Buttons';

import OverviewActiveLight from '@media/UI/overview-active-light.svg';
import OverviewInactiveLight from '@media/UI/overview-inactive-light.svg';
import OverviewActiveDark from '@media/UI/overview-active-dark.svg';
import OverviewInactiveDark from '@media/UI/overview-inactive-dark.svg';

import DriveActiveLight from '@media/UI/drive-active-light.svg';
import DriveInactiveLight from '@media/UI/drive-inactive-light.svg';
import DriveActiveDark from '@media/UI/drive-active-dark.svg';
import DriveInactiveDark from '@media/UI/drive-inactive-dark.svg';

import ExploreActiveLight from '@media/UI/explore-active-light.svg';
import ExploreInactiveLight from '@media/UI/explore-inactive-light.svg';
import ExploreActiveDark from '@media/UI/explore-active-dark.svg';
import ExploreInactiveDark from '@media/UI/explore-inactive-dark.svg';

import InviteInactiveLight from '@media/UI/invite-inactive-light.svg';
import InviteActiveLight from '@media/UI/invite-active-light.svg';

import InviteInactiveDark from '@media/UI/invite-inactive-dark.svg';
import InviteActiveDark from '@media/UI/invite-active-dark.svg';

import classes from './MainSideBar.module.scss';
import DriveActionBarMobile from '../DriveActionBar/DriveActionBarMobile';
import { UpdateDriveProps } from '@interfaces/handlers';
import { useLocales } from '@context/LocalesContext';
import { useFdpStorage } from '@context/FdpStorageContext';

interface MainSideBarProps extends UpdateDriveProps {
  driveSideBarToggle: any;
  refreshPods?: () => void;
}

const MainSideBar: FC<MainSideBarProps> = ({
  driveSideBarToggle,
  updateDrive,
  refreshPods,
}) => {
  const { intl } = useLocales();
  const { loginType } = useFdpStorage();

  const items = [
    {
      label: intl.get('OVERVIEW'),
      link: '/overview',
      icons: {
        light: {
          active: <OverviewActiveLight />,
          inactive: <OverviewInactiveLight />,
        },
        dark: {
          active: <OverviewActiveDark />,
          inactive: <OverviewInactiveDark />,
        },
      },
    },
    {
      label: intl.get('DRIVE'),
      link: '/drive',
      icons: {
        light: {
          active: <DriveActiveLight />,
          inactive: <DriveInactiveLight />,
        },
        dark: {
          active: <DriveActiveDark />,
          inactive: <DriveInactiveDark />,
        },
      },
    },
    {
      label: intl.get('EXPLORE'),
      link: '/explore',
      icons: {
        light: {
          active: <ExploreActiveLight />,
          inactive: <ExploreInactiveLight />,
        },
        dark: {
          active: <ExploreActiveDark />,
          inactive: <ExploreInactiveDark />,
        },
      },
    },
  ];

  if (loginType !== 'blossom') {
    items.push({
      label: intl.get('INVITE'),
      link: '/invite',
      icons: {
        light: {
          active: <InviteActiveLight />,
          inactive: <InviteInactiveLight />,
        },
        dark: {
          active: <InviteActiveDark />,
          inactive: <InviteInactiveDark />,
        },
      },
    });
  }

  const [renderDriveMenu, setRenderDriveMenu] = useState<boolean>(false);

  useEffect(() => {
    setRenderDriveMenu(Boolean(router.pathname === '/drive' && updateDrive));
  }, [updateDrive]);

  return (
    <div
      className={`${classes.sideBar} flex flex-col justify-start items-center w-full h-full bg-color-shade-dark-3-day dark:bg-color-shade-dark-3-night`}
    >
      {items.map((item) => {
        return (
          <MainSideBarItem
            key={item.label}
            icons={item.icons}
            label={item.label}
            link={item.link}
            driveSideBarToggle={driveSideBarToggle}
          />
        );
      })}

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
