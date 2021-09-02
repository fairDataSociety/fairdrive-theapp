import React, { useContext, useState } from 'react';

// Hooks
import useStyles from './homeStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import MenuRibbon from './partials/menuRibbon/menuRibbon';
import Drive from 'src/pages/home/content/drive/drive';
import PodSidebar from './partials/podSidebar/podSidebar';
import RightSidebar, {
  RIGHT_SIDEBAR_VARIANTS,
} from './partials/rightSidebar/rightSidebar';
// import Overview from 'layout/components/overview/overview';

// Types
import { IFile } from 'src/types/models/File';

export interface OpenRightSidebar {
  payload?: IFile;
  variant: RIGHT_SIDEBAR_VARIANTS;
}
export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [sidebarItem, setSidebarItem] = useState('Drive');
  const [showPodSidebar, setShowPodSidebar] = useState(false);

  // Right Sidebar managment
  const [rightSidebarData, setRightSidebarData] =
    useState<OpenRightSidebar | null>(null);

  const openRightSidebar = (data: OpenRightSidebar): void => {
    setRightSidebarData({
      payload: data.payload,
      variant: data.variant,
    });
  };

  const closeRightSidebar = (): void => {
    setRightSidebarData(null);
  };

  return (
    <div className={classes.Home}>
      <MenuRibbon
        showPodSidebar={showPodSidebar}
        setShowPodSidebar={setShowPodSidebar}
        sidebarItem={sidebarItem}
        setSidebarItem={setSidebarItem}
      />
      <PodSidebar
        setShowPodSidebar={setShowPodSidebar}
        isOpen={sidebarItem !== 'Explore' && showPodSidebar}
        route={sidebarItem}
      />
      {sidebarItem === 'Drive' && (
        <Drive
          isPodBarOpen={showPodSidebar}
          setRightSidebarContent={(data) => openRightSidebar(data)}
        />
      )}
      {rightSidebarData && (
        <RightSidebar
          onClose={() => closeRightSidebar()}
          file={rightSidebarData.payload}
          variant={rightSidebarData.variant}
        />
      )}
    </div>
  );
}

export default React.memo(Home);
