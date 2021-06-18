import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./navbarStyles";
import SearchBar from "../../components/searchBar/searchBar";

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
        Fairdrive
      </div>
      {state.userData && <SearchBar />}
    </div>
  );
}

export default React.memo(Navbar);
