import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./sidebarStyles";

export interface Props {}

function Sidebar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  //Load pods
  return !state.password && <div className={classes.Sidebar}></div>;
}

export default React.memo(Sidebar);
