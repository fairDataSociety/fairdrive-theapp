import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./navbarStyles";
import NavItems from "../../components/navItems/navItems";
import { Logo } from "src/components/icons/icons";

export interface Props {}

function Navbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Navbar}>
      <div
        onClick={() => {
          actions.setDirectory("root");
        }}
        className={classes.logo}
      >
        <Logo className={classes.logo} />
      </div>
      {state.userData && <NavItems />}
    </div>
  );
}

export default React.memo(Navbar);
