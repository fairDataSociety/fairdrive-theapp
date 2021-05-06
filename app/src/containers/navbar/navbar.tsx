import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./navbarStyles";

export interface Props {}

function Navbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return !state.password && <div className={classes.Navbar}>Fairdrive</div>;
}

export default React.memo(Navbar);
