import React, { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';
import { usePodStateMachine } from 'src/contexts/podStateMachine';
import { STATES_NAMES } from 'src/types/pod-state';

import useStyles from './searchBarStyles';
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

function SearchBar() {
  // General
  const { actions } = useContext(StoreContext);
  const { theme } = useTheme();
  const { podStateMachine } = usePodStateMachine();
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

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (
      podStateMachine.tag === STATES_NAMES.POD_STATE ||
      podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [podStateMachine]);

  useEffect(() => {
    if (search.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [search]);

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
        ${isFilled ? classes.filled : ''}
        ${isDisabled ? classes.disabled : ''}
      `}
        onClick={() => {
          if (input.current && !isDisabled) {
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
          value={search}
          disabled={isDisabled}
          placeholder={isFocused ? '' : 'Search'}
          onChange={(e) => handleSetProp(e)}
        ></input>
        {!isDisabled && (
          <div className={classes.iconContainer}>
            <Close
              onClick={onDiscard}
              className={`${classes.Icon} ${classes.closeIcon}`}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(SearchBar);
