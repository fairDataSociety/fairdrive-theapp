import React, { useContext } from 'react';

// Hooks
import useStyles from './menuRibbonStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import SidebarItem from 'src/components/sidebarItem/sidebarItem';
import { Drive, Dashboard, Globe } from 'src/components/icons/icons';

// Types
import { AVAILABLE_PAGES } from 'src/types/pages';

export interface Props {
  showPodSidebar: boolean;
  setShowPodSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarItem: AVAILABLE_PAGES;
  setSidebarItem: (pageName: AVAILABLE_PAGES) => void;
}

function MenuRibbon(props: Props) {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
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
    {
      name: AVAILABLE_PAGES.OVERVIEW,
      icon: Dashboard,
      isDisabled: true,
    },
    {
      name: AVAILABLE_PAGES.DRIVE,
      icon: Drive,
      isDisabled: false,
    },
    {
      name: AVAILABLE_PAGES.EXPLORE,
      icon: Globe,
      isDisabled: true,
    },
  ];

  return (
    state.userData && (
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
    )
  );
}

export default React.memo(MenuRibbon);
