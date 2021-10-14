import React, { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import { PodProviderContext } from 'src/machines/pod';
import PodStates from 'src/machines/pod/states';

import { useTheme } from 'src/contexts/themeContext/themeContext';
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
  const { PodMachineStore, PodMachineActions } = useContext(PodProviderContext);

  // General
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  // Search params
  const [search, setSearchTerm] = useState<string>('');

  const input = useRef(null);

  const handleSetProp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    PodMachineActions.onSetSearchQuery(event.target.value);
  };

  const onDiscard = () => {
    setSearchTerm('');
    PodMachineActions.onClearSearchQuery();
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
    const isDirectoryOpened = `${PodStates.FETCH_PODS}.${PodStates.FETCH_PODS_SUCCESS}.${PodStates.OPEN_POD}.${PodStates.OPEN_POD_SUCCESS}.${PodStates.DIRECTORY}.${PodStates.DIRECTORY_SUCCESS}`;
    const areAnyFilesInDirectory =
      PodMachineStore.context.directoryData &&
      PodMachineStore.context.directoryData.files &&
      PodMachineStore.context.directoryData.files.length > 0;

    if (PodMachineStore.matches(isDirectoryOpened) && areAnyFilesInDirectory) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [PodMachineStore]);

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
