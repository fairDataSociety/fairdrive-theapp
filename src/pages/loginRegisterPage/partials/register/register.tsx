import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import AuthStates from 'src/machines/auth/states';
import { AuthProviderContext } from 'src/machines/auth';

import useStyles from './registerStyles';
import ButtonPill from 'src/components/buttonPill/buttonPill';
import TextField from 'src/components/textField/textField';
import SeedPhraseGen from './partials/seedPhraseGen/seedPhraseGen';
import SeedPhraseConfirm from './partials/seedPhraseConfirm/seedPhraseConfirm';
import welcomeImage from 'src/media/images/welcome-image.png';

export interface Props {
  backFunction: () => void;
}

function Register(props: Props) {
  // Matomo
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Register Page',
      href: 'https://app.fairdrive.fairdatasociety.org/',
    });
  }, []);

  const { AuthMachineStore, AuthMachineActions } =
    useContext(AuthProviderContext);

  // const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [hasError, setHasError] = useState(false);
  const [showRegisterArea, setShowRegisterArea] = useState(true);
  const [showMnemonicArea, setShowMnemonicArea] = useState(false);
  const [showMnemonicInputArea, setShowMnemonicInputArea] = useState(false);

  useEffect(() => {
    if (
      AuthMachineStore.matches({
        [AuthStates.REGISTER_NODE]: AuthStates.REGISTER_CREATE_MNEMONIC_SUCCESS,
      })
    ) {
      setShowRegisterArea(false);
      setShowMnemonicArea(true);
      setShowMnemonicInputArea(false);
    }
  }, [AuthMachineStore]);

  function onContinue() {
    // if (await isUsernamePresent(username)) return false;
    if (!username || !password) return null;
    // TODO validate inputs

    // Store username, password
    const data = {
      username,
      password,
    };

    // Below action set's username and password also initate generate of mnemonic
    AuthMachineActions.onRegisterSetUsernameAndPassword(data);
  }

  const onFinalConfirmation = (): void =>
    AuthMachineActions.onRegisterValidUserProvidedMnemonic();

  return (
    <div className={classes.Login}>
      <div className={classes.imageContainer}>
        <img src={welcomeImage} alt="alt" className={classes.image} />
      </div>
      {showRegisterArea && (
        <div className={classes.registerContainer}>
          <div className={classes.title}>Account Credentials</div>

          <div className={classes.description}>
            Depending on the option you choose, you’ll either get to log back in
            or register a new account. All of this will be automatically
            determined for you.
          </div>

          <TextField
            placeholder="Username"
            type="text"
            setHasError={setHasError}
            setProp={setUsername}
            propValue={username}
            onContinue={onContinue}
          ></TextField>

          <TextField
            placeholder="Password"
            type="password"
            setHasError={setHasError}
            setProp={setPassword}
            propValue={password}
            onContinue={onContinue}
          ></TextField>
          {hasError ? (
            <div className={classes.errormsg}>Could not login.</div>
          ) : (
            ''
          )}
          <ButtonPill text={'Continue'} clickFunction={onContinue}></ButtonPill>
          <ButtonPill
            text="Back"
            color="grey"
            clickFunction={props.backFunction}
          />
        </div>
      )}
      {showMnemonicArea && (
        <SeedPhraseGen
          generatedMnemonic={
            AuthMachineStore.context.registrationMnemonicPhrase
          }
          onContinue={() => {
            setShowRegisterArea(false);
            setShowMnemonicArea(false);
            setShowMnemonicInputArea(true);
          }}
        />
      )}
      {showMnemonicInputArea && (
        <SeedPhraseConfirm
          generatedMnemonic={
            AuthMachineStore.context.registrationMnemonicPhrase
          }
          onProvidedMnemonicValid={() => onFinalConfirmation()}
        />
      )}
    </div>
  );
}

export default React.memo(Register);
