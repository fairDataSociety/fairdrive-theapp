import React, { useContext, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from './loginStyles';
import ButtonPill from '../buttonPill/buttonPill';
import TextField from '../textField/textField';
import welcomeImage from '../../media/images/welcome-image.png';
import { CirclePart } from '../icons/icons';
import { useEffect } from 'react';

export interface Props {
  backFunction: () => void;
}

function Login(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState('');

  const [hasError, setHasError] = useState(false);
  //add UseEffect when state changes to reload it and store it

  async function onLogin() {
    actions.userLogin({
      username,
      password,
    });
    actions.getPods();
    actions.getUserStats();
  }
  useEffect(() => {
    if (state.flags.loginStatus === 'fail') {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  }, [state.flags.loginStatus, username]);

  return (
    <div className={classes.Login}>
      <div className={classes.imageContainer}>
        <img
          alt="lego man for login"
          className={classes.image}
          src={welcomeImage}
        />
      </div>

      <div className={classes.loginContainer}>
        <div className={classes.header}>
          <div className={classes.title}>Account Credentials</div>
          <p>
            Depending on the option you choose, you’ll either get to log back in
            or register a new account. All of this will be automatically
            determined for you.
          </p>
        </div>

        <TextField
          autoFocus
          placeholder="Username"
          type="text"
          setHasError={setHasError}
          setProp={setUsername}
          propValue={username}
          onContinue={onLogin}
        />

        <TextField
          placeholder="Password"
          type="password"
          setHasError={setHasError}
          setProp={setPassword}
          onContinue={onLogin}
          propValue={password}
          className={classes.bottomTextField}
        />

        <div className={classes.feedbackContainer}>
          {state.flags.loginStatus === 'loading' && (
            <CirclePart className={classes.spinner} />
          )}
          {state.flags.loginStatus === 'success' && (
            <p className={classes.feedbackMessage}>
              Success!! 🥳 Please wait...
            </p>
          )}
          {hasError && (
            <p className={`${classes.feedbackMessage} ${classes.error}`}>
              Invalid credentials, please try again.
            </p>
          )}
        </div>

        <ButtonPill text={'Login'} clickFunction={onLogin} />
        <ButtonPill
          text="Back"
          color="grey"
          clickFunction={props.backFunction}
        />
      </div>
    </div>
  );
}

export default React.memo(Login);
