import React, { useContext, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

import useStyles from 'src/pages/loginRegisterPage/partials/register/registerStyles';
import ButtonPill from 'src/components/buttonPill/buttonPill';

import TextField from 'src/components/textField/textField';

export interface Props {
  generatedMnemonic: string | null;
  onProvidedMnemonicValid: () => void;
}

function SeedPhraseConfirm(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const [wordFive, setWordFive] = useState('');
  const [wordEleven, setWordEleven] = useState('');
  const [wordTwelve, setWordTwelve] = useState('');
  // eslint-disable-next-line
  const [registerLoader, setRegisterLoader] = useState(false);

  // eslint-disable-next-line
  const [hasError, setHasError] = useState(false);

  async function onRegister() {
    if (!props.generatedMnemonic) return null;
    const seedWords = props.generatedMnemonic.split(' ');

    if (
      wordFive === seedWords[4] &&
      wordEleven === seedWords[10] &&
      wordTwelve === seedWords[11]
    ) {
      props.onProvidedMnemonicValid();
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
