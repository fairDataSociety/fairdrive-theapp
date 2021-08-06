import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from './searchBarStyles';
import { Search, Close } from '../icons/icons';

function SearchBar() {
  const { actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const handleSetProp = (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.setSearchQuery(event.target.value);
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
          <Close className={classes.Icon} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
