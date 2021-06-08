import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./sidebarStyles";
import SidebarLink from "../../components/sidebarLink/sidebarLink";
import { Drive, Dashboard, Globe } from "../../components/icons/icons";

export interface Props {}

function Sidebar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  //Load pods
  return (
    state.userData && (
      <div className={classes.Sidebar}>
        <SidebarLink
          Icon={Dashboard}
          title="Overview"
          path="/overview"
        ></SidebarLink>
        <SidebarLink
          Icon={Drive}
          title="Drive"
          path="/drive/root"
        ></SidebarLink>
        <SidebarLink
          Icon={Globe}
          title="Explore"
          path="/overview"
        ></SidebarLink>
      </div>
    )
  );
}

export default React.memo(Sidebar);
