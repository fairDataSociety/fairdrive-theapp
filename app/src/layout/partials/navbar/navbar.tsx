import React, { useContext, useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Hooks
import useStyles from './navbarStyles';

// Components
import NavItems from 'src/components/navItems/navItems';
import { ChevronDown, Logo } from 'src/components/icons/icons';
import DropDown from 'src/components/dropDown/dropDown';

export interface Props {
  setShowTerms?: (data) => void;
  showTerms?: boolean;
}

function Navbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [activityDropdown, setActivityDropdown] = useState(false);

  return (
    <header className={classes.Navbar}>
      <div className={classes.navbarLeftSide}>
        <div
          onClick={() => {
            props.setShowTerms(false);
            actions.setDirectory('root');
          }}
          className={classes.logo}
        >
          <Logo className={classes.logo} />
        </div>
        {state.userData ? (
          <div className={classes.serverSelection}>
            <button
              className={classes.serverSelectButton}
              onClick={() => setActivityDropdown(true)}
            >
              FairOs Server
              <ChevronDown className={classes.indicatorIcon}></ChevronDown>
            </button>
            {activityDropdown ? (
              <ClickAwayListener onClickAway={() => setActivityDropdown(false)}>
                <div className={classes.serverSelectionDropDown}>
                  <DropDown variant="tertiary" heading="Activity Coming Soon">
                    Only active server at the moment.
                  </DropDown>
                </div>
              </ClickAwayListener>
            ) : null}
          </div>
        ) : null}
      </div>
      {state.userData && <NavItems />}
    </header>
  );
}

export default React.memo(Navbar);
