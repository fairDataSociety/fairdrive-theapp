import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./homeStyles";

import Sidebar from "../sidebar/sidebar";
import Drive from "../../components/drive/drive";
import Overview from "../../components/overview/overview";
import PodSidebar from "../../components/podSidebar/podSidebar";

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [sidebarItem, setSidebarItem] = useState("Overview");
  const [showPodSidebar, setShowPodSidebar] = useState(false);
  return (
    <div className={classes.Home}>
      <Sidebar
        showPodSidebar={showPodSidebar}
        setShowPodSidebar={setShowPodSidebar}
        sidebarItem={sidebarItem}
        setSidebarItem={setSidebarItem}
      />
      <PodSidebar isOpen={showPodSidebar} route={sidebarItem}></PodSidebar>
      {sidebarItem === "Drive" && <Drive isPodBarOpen={showPodSidebar}></Drive>}
      {sidebarItem === "Overview" && <Overview isPodBarOpen={showPodSidebar}></Overview>}
    </div>
  );
}

export default React.memo(Home);
