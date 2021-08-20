import React, { useContext, useState } from 'react';

// Hooks
import useStyles from './homeStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import Sidebar from './/partials/sidebar/sidebar';
import Drive from 'src/components/drive/drive';
import PodSidebar from './/partials/podSidebar/podSidebar';
// import Overview from 'layout/components/overview/overview';

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [sidebarItem, setSidebarItem] = useState('Drive');
  const [showPodSidebar, setShowPodSidebar] = useState(false);
  return (
    <div className={classes.Home}>
      <Sidebar
        showPodSidebar={showPodSidebar}
        setShowPodSidebar={setShowPodSidebar}
        sidebarItem={sidebarItem}
        setSidebarItem={setSidebarItem}
      />
      <PodSidebar
        setShowPodSidebar={setShowPodSidebar}
        isOpen={sidebarItem !== 'Explore' && showPodSidebar}
        route={sidebarItem}
      ></PodSidebar>
      {sidebarItem === 'Drive' && <Drive isPodBarOpen={showPodSidebar}></Drive>}
      {/* {sidebarItem === "Overview" && (
        <Overview isPodBarOpen={showPodSidebar}></Overview>
      )}
      {sidebarItem === "Explore" && <></>} */}
    </div>
  );
}

export default React.memo(Home);
