import React from 'react';

// Hooks
import useStyles from './menuRibbonStyles';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import SidebarItem from 'src/components/sidebarItem/sidebarItem';
import { Drive } from 'src/components/icons/icons';

// Types
import { AVAILABLE_PAGES } from 'src/types/pages';

export interface Props {
  showPodSidebar: boolean;
  setShowPodSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarItem: AVAILABLE_PAGES;
  setSidebarItem: (pageName: AVAILABLE_PAGES) => void;
}

function MenuRibbon(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const { showPodSidebar, setShowPodSidebar, sidebarItem, setSidebarItem } =
    props;

  const switchPages = async (pageName: AVAILABLE_PAGES) => {
    if (pageName === sidebarItem) {
      setShowPodSidebar(!showPodSidebar);
    } else {
      setSidebarItem(pageName);
    }
  };

  const pages = [
    // {
    //   name: AVAILABLE_PAGES.OVERVIEW,
    //   icon: Dashboard,
    //   isDisabled: true,
    // },
    {
      name: AVAILABLE_PAGES.DRIVE,
      icon: Drive,
      isDisabled: false,
    },
    // {
    //   name: AVAILABLE_PAGES.EXPLORE,
    //   icon: Globe,
    //   isDisabled: true,
    // },
  ];

  return (
    <div className={classes.Sidebar}>
      {pages.map((page, index) => (
        <SidebarItem
          key={index}
          onClick={() => switchPages(page.name)}
          Icon={page.icon}
          title={page.name}
          isActive={showPodSidebar && page.name === sidebarItem}
          isDisabled={page.isDisabled}
        />
      ))}
    </div>
  );
}

export default React.memo(MenuRibbon);
