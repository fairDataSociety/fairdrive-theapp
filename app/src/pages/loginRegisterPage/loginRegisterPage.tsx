import React, { useState } from 'react';

// Hooks
import { MachinesHelpers } from 'src/hooks/machines';
import useStyles from './loginRegisterPageStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import Login from 'src/pages/loginRegisterPage/partials/login/login';
import Register from 'src/pages/loginRegisterPage/partials/register/register';
import ButtonPill from 'src/components/buttonPill/buttonPill';

function Main() {
  const { isUserLoggedInAndUserStatsFetched } = MachinesHelpers();

  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const [showRegisterComponent, setShowRegisterComponent] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(false);

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
      {!isUserLoggedInAndUserStatsFetched() && showLoginComponent && (
        <Login
          backFunction={() => {
            setShowLoginComponent(false);
            setShowRegisterComponent(false);
          }}
        ></Login>
      )}
      {!isUserLoggedInAndUserStatsFetched() && showRegisterComponent && (
        <Register></Register>
      )}
    </>
  );
}
export default React.memo(Main);
