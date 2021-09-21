import React, { useContext, useState } from 'react';
import useStyles from './loginRegisterPageStyles';
import ButtonPill from 'src/components/buttonPill/buttonPill';
import { StoreContext } from 'src/store/store';
import { useTheme } from 'src/contexts/themeContext/themeContext';

import Login from 'src/pages/loginRegisterPage/partials/login/login';
import Register from 'src/pages/loginRegisterPage/partials/register/register';

function Main() {
  const { state } = useContext(StoreContext);
  const { theme } = useTheme();
  const [showRegisterComponent, setShowRegisterComponent] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const classes = useStyles({ ...theme });

  return (
    <>
      {!showRegisterComponent && !showLoginComponent && (
        <div className={classes.loginRegisterButtons}>
          {' '}
          <ButtonPill
            text="Login"
            color="grey"
            clickFunction={() => {
              setShowLoginComponent(true);
              setShowRegisterComponent(false);
            }}
          />
          <ButtonPill
            text="Register"
            color="grey"
            clickFunction={() => {
              setShowLoginComponent(false);
              setShowRegisterComponent(true);
            }}
          />
        </div>
      )}
      {state.userData?.code !== 200 && showLoginComponent && (
        <Login
          backFunction={() => {
            setShowLoginComponent(false);
            setShowRegisterComponent(false);
          }}
        ></Login>
      )}
      {state.userData?.code !== 200 && showRegisterComponent && (
        <Register></Register>
      )}
    </>
  );
}
export default React.memo(Main);
