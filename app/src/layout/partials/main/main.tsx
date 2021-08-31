import React, { useContext } from 'react';

// Hooks
import useStyles from './mainStyles';

// Contexts
import { StoreContext } from 'src/store/store';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Pages
import Home from 'src/pages/home/home';
import LoginRegisterPage from 'src/pages/loginRegisterPage/loginRegisterPage';

import { HTTP_CODES } from 'src/types/http/HTTPCodes';

function Main() {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const isUserLoggedIn = () => state.userData?.code === HTTP_CODES.OK;

  return (
    <main className={classes.Main}>
      {isUserLoggedIn() ? <Home /> : <LoginRegisterPage />}
    </main>
  );
}
export default React.memo(Main);
