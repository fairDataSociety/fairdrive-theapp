import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./sidebarStyles";
import SidebarItem from "../../components/sidebarItem/sidebarItem";
import { Drive, Dashboard, Globe } from "../../components/icons/icons";

export interface Props {
  setSidebarItem: any;
}

function Sidebar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  //Load pods
  return (
    state.userData && (
      <div className={classes.Sidebar}>
        <SidebarItem
          onClick={() => {
            props.setSidebarItem("Overview");
          }}
          Icon={Dashboard}
          title="Overview"
        />
        <SidebarItem
          onClick={() => {
            props.setSidebarItem("Drive");
          }}
          Icon={Drive}
          title="Drive"
        />
        <SidebarItem
          onClick={() => {
            props.setSidebarItem("Explore");
          }}
          Icon={Globe}
          title="Explore"
        />
      </div>
    )
  );
}

export default React.memo(Sidebar);
