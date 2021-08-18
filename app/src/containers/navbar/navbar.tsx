import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from './navbarStyles';
import NavItems from '../../components/navItems/navItems';
import { Logo } from 'src/components/icons/icons';

export interface Props {
  setShowTerms?: (data) => void;
  showTerms?: boolean;
}

function Navbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <header className={classes.Navbar}>
      <div
        onClick={() => {
          props.setShowTerms(false);
          actions.setDirectory('root');
        }}
        className={classes.logo}
      >
        <Logo className={classes.logo} />
      </div>
      {state.userData && <NavItems />}
    </header>
  );
}

export default React.memo(Navbar);
