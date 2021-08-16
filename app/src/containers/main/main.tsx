import React, { useContext } from 'react';
import useStyles from './mainStyles';
import { StoreContext } from '../../store/store';
import { ThemeContext } from '../../store/themeContext/themeContext';
import Home from '../home/home';
import LoginRegisterPage from '../loginRegisterPage/loginRegisterPage';

import { HTTP_CODES } from "../../types/http/HTTPCodes";

function Main() {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  return (
    <main className={classes.Main}>
      {state.userData?.code === HTTP_CODES.OK ? (
        <>
          <Home></Home>
        </>
      ) : (
        <LoginRegisterPage></LoginRegisterPage>
      )}
    </main>
  );
}
export default React.memo(Main);
