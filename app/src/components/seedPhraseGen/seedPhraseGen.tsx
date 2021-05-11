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

// TODO move to store properly
const SEED_PHRASE = 'word word word word word word word word word word word word'

function SeedPhraseGen(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  //add UseEffect when state changes to reload it and store it
  useEffect(() => {
    if (state.password) {
      history.push("/drive/root");
      window.location.reload();
    }
  }, [state.userData]);

  async function onContinue() {
    // TODO

    console.log("Continue");

    history.push("/confirm-seed");
    window.location.reload();
  }

  return (
    <div className={classes.Login}>
      {state.password && <Redirect to={"/drive/root"} />}
      <div className={classes.title}>Registering account...</div>

      <div className={classes.description}>
        Your seed phrase is used to generate and recover your account
        Please save these 12 words on a piece of paper or a hardware wallet. The order is important. This seed will allow you to recover your account.
      </div>

      <div className={classes.flexer}></div>

      < SeedPhrase seedPhrase={SEED_PHRASE} />

      {/* TODO need T&C checkbox */}

      {hasError ? <div className={classes.errormsg}>Please confirm you understand how the seed phrase works.</div> : ""}
      <Button text={"Continue"} clickFunction={onContinue}></Button>
    </div>
  );
}

export default React.memo(SeedPhraseGen);
