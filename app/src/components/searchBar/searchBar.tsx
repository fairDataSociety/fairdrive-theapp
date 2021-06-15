import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./searchBarStyles";
import { Search, Close } from "../icons/icons";

export interface Props {}

function SearchBar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const handleSetProp = (e: any) => {
    actions.setSearchQuery(e.target.value);
  };

  return (
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
        <div className={classes.iconContainer}>
          <Close className={classes.Icon} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
