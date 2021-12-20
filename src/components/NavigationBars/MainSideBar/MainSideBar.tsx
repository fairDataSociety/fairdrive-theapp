import { FC } from 'react';

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

import classes from './MainSideBar.module.scss';

interface MainSideBarProps {}

const MainSideBar: FC<MainSideBarProps> = () => {
  const items = [
    {
      label: 'Overview',
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
      label: 'Drive',
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
      label: 'Explore',
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
          />
        );
      })}
    </div>
  );
};

export default MainSideBar;
