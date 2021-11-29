import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './exploreSearchBarStyles';
import { SearchLoupe, Close } from 'src/components/icons/icons';
import ClickAwayListener from 'react-click-away-listener';

function useKeyPress(upHandler) {
  useEffect(() => {
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
}

export interface Props {
  appSearch: string;
  setAppSearch: Dispatch<SetStateAction<string>>;
}

function ExploreSearchBar(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const input = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAppSearch(event.target.value);
  };

  useKeyPress((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.setAppSearch('');
    }
  });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsFocused(false);
      }}
    >
      <div
        className={`
        ${classes.searchBar}
        ${isFocused ? classes.focused : ''}
      `}
        onClick={() => {
          if (input.current) {
            input.current.focus();
            setIsFocused(true);
          }
        }}
      >
        <div className={classes.iconContainer}>
          <SearchLoupe className={classes.SearchIcon} />
        </div>
        <input
          className={classes.input}
          type="text"
          ref={input}
          value={props.appSearch}
          placeholder={isFocused ? '' : 'Search DApps'}
          onChange={(e) => handleChange(e)}
        ></input>
        {props.appSearch.length > 0 && (
          <div className={classes.iconContainer}>
            <Close
              onClick={() => props.setAppSearch('')}
              className={`${classes.Icon} ${classes.closeIcon}`}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(ExploreSearchBar);
