import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./homeStyles";

import Sidebar from "../sidebar/sidebar";
import Drive from "../../components/drive/drive";
import Overview from "../../components/overview/overview";

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [sidebarItem, setSidebarItem] = useState("Overview");

  return (
    <div className={classes.Home}>
      <Sidebar setSidebarItem={setSidebarItem} />
      {sidebarItem === "Drive" && <Drive></Drive>}
      {sidebarItem === "Overview" && <Overview></Overview>}
    </div>
  );
}

export default React.memo(Home);
