import React, { useContext, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from 'src/pages/loginRegisterPage/partials/register/registerStyles';
import ButtonPill from 'src/components/buttonPill/buttonPill';
import SeedPhrase from '../seedPhrase/seedPhrase';

export interface Props {
  generatedMnemonic: string | null;
  onContinue: () => void;
}

function SeedPhraseGen(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  // eslint-disable-next-line
  const [hasError, setHasError] = useState(false);

  return (
    <div className={classes.Login}>
      <div className={classes.registerContainer}>
        <div className={classes.title}>Registering account...</div>

        <div className={classes.description}>
          Your seed phrase is used to generate and recover your account Please
          save these 12 words on a piece of paper or a hardware wallet. The
          order is important. This seed will allow you to recover your account.
        </div>

        {props.generatedMnemonic ? (
          <SeedPhrase seedPhrase={props.generatedMnemonic} />
        ) : (
          <div>Loading...</div>
        )}

        {/* TODO need T&C checkbox */}

        {hasError ? (
          <div className={classes.errormsg}>
            Please confirm you understand how the seed phrase works.
          </div>
        ) : (
          ''
        )}
        <ButtonPill
          text={'Continue'}
          clickFunction={props.onContinue}
        ></ButtonPill>
      </div>
    </div>
  );
}

export default React.memo(SeedPhraseGen);
