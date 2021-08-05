import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from '../register/registerStyles';
import ButtonPill from '../buttonPill/buttonPill';

import TextField from '../textField/textField';
import {
  createAccount,
  createDirectory,
  createPod,
  userLoggedIn,
} from '../../store/services/fairOS';
export interface Props {}

function SeedPhraseConfirm(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [wordFive, setWordFive] = useState('');
  const [wordEleven, setWordEleven] = useState('');
  const [wordTwelve, setWordTwelve] = useState('');
  // eslint-disable-next-line
  const [registerLoader, setRegisterLoader] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  // eslint-disable-next-line
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (userCreated) {
      actions.userLogin({ username: state.username, password: state.password });
    }
  }, [actions, state.password, state.username, userCreated]);

  async function onRegister() {
    console.log('in confirm component', state.mnemonic);

    if (!state.mnemonic) return null;
    const seedWords = state.mnemonic.split(' ');

    if (
      wordFive === seedWords[4] &&
      wordEleven === seedWords[10] &&
      wordTwelve === seedWords[11]
    ) {
      // TODO
      await createAccount({
        username: state.username,
        password: state.password,
        mnemonic: state.mnemonic,
      });
      setUserCreated(true);
    }
  }

  return (
    <div>
      {!registerLoader && (
        <div className={classes.Login}>
          <div className={classes.registerContainer}>
            <div className={classes.title}>Continue without single-sign-on</div>

            <div className={classes.description}>
              Depending on the option you choose, you’ll either get to log back
              in or register a new account. All of this will be automatically
              determined for you.
            </div>

            <TextField
              placeholder="Word #5"
              type="text"
              setHasError={setHasError}
              setProp={setWordFive}
              propValue={wordFive}
              onContinue={onRegister}
            ></TextField>

            <TextField
              placeholder="Word #11"
              type="text"
              setHasError={setHasError}
              setProp={setWordEleven}
              propValue={wordEleven}
              onContinue={onRegister}
            ></TextField>

            <TextField
              placeholder="Word #12"
              type="text"
              setHasError={setHasError}
              propValue={wordTwelve}
              setProp={setWordTwelve}
              onContinue={onRegister}
            ></TextField>

            <ButtonPill
              text={'Register'}
              clickFunction={onRegister}
            ></ButtonPill>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(SeedPhraseConfirm);
