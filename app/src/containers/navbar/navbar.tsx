import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./navbarStyles";
import { Link } from "react-router-dom";
import TextField from "../../components/textField/textField";
import { Search } from "../../components/icons/icons";

export interface Props {}

function Navbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [searchQuery, setSearchQuery] = useState("");
  const handleSetProp = (e: any) => {
    actions.setSearchQuery(e.target.value);
  };

  return (
    <div className={classes.Navbar}>
      <Link to={"/"} className={classes.logo}>
        Fairdrive
      </Link>
      {state.userData && (
        <div className={classes.searchBar}>
          <div className={classes.TextField}>
            <div className={classes.iconContainer}>
              <Search className={classes.Icon} />
            </div>

            <input
              className={classes.input}
              type="text"
              placeholder="Search"
              onChange={(e) => handleSetProp(e)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Navbar);
