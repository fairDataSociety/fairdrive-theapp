import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "../register/registerStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import SeedPhrase from '../seedPhrase/seedPhrase'
import { useHistory, Redirect } from "react-router-dom";
export interface Props { }

function SeedPhraseGen(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  async function onContinue() {
    history.push("/confirm-seed");
    window.location.reload();
  }

  console.log("mnemonic", state.mnemonic)

  return (
    <div className={classes.Login}>
      <div className={classes.title}>Registering account...</div>

      <div className={classes.description}>
        Your seed phrase is used to generate and recover your account
        Please save these 12 words on a piece of paper or a hardware wallet. The order is important. This seed will allow you to recover your account.
      </div>

      <div className={classes.flexer}></div>

      {
        
        state.mnemonic ?
          < SeedPhrase seedPhrase={state.mnemonic} /> :
          <div>Loading...</div>
      }



      {/* TODO need T&C checkbox */}

      {hasError ? <div className={classes.errormsg}>Please confirm you understand how the seed phrase works.</div> : ""}
      <Button text={"Continue"} clickFunction={onContinue}></Button>
    </div>
  );
}

export default React.memo(SeedPhraseGen);
