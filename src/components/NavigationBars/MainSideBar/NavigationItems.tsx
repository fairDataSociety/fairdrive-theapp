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
import { useLocales } from '@context/LocalesContext';
import { useFdpStorage } from '@context/FdpStorageContext';

interface NavigationItemsProps {
  driveSideBarToggle: any;
  className?: string;
  onOptionClick?: () => void;
}

const NavigationItems = ({
  driveSideBarToggle,
  className,
  onOptionClick,
}: NavigationItemsProps) => {
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
      className: 'drive-navigation-button',
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
      className: 'invite-navigation-button',
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

  return (
    <>
      {items.map((item) => {
        return (
          <MainSideBarItem
            className={`${className} ${item.className}`}
            key={item.label}
            icons={item.icons}
            label={item.label}
            link={item.link}
            driveSideBarToggle={driveSideBarToggle}
            onClick={onOptionClick}
          />
        );
      })}
    </>
  );
};

export default NavigationItems;
