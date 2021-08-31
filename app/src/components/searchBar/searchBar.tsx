import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from './searchBarStyles';
import { Search, Close } from '../icons/icons';

function useKeyPress(upHandler) {
  useEffect(() => {
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
}

function SearchBar() {
  const { actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });
  const [search, setSearchTerm] = useState<string>('');

  const input = useRef(null);

  const handleSetProp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    actions.setSearchQuery(event.target.value);
  };

  const onDiscard = () => {
    setSearchTerm('');
    actions.setSearchQuery('');
  };

  useKeyPress((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onDiscard();
    }
  });

  return (
    <div className={classes.searchBar}>
      <div
        className={classes.TextField}
        onClick={() => {
          if (input.current) {
            input.current.focus();
          }
        }}
      >
        <div className={classes.iconContainer}>
          <Search className={classes.Icon} />
        </div>
        <input
          className={classes.input}
          type="text"
          ref={input}
          value={search}
          placeholder="Search"
          onChange={(e) => handleSetProp(e)}
        ></input>
        <div className={classes.iconContainer}>
          <Close onClick={onDiscard} className={classes.Icon} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
