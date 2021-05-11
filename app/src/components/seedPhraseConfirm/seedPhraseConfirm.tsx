import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "../register/registerStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import { useHistory, Redirect } from "react-router-dom";
export interface Props { }

function SeedPhraseConfirm(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [wordFive, setWordFive] = useState('')
  const [wordEleven, setWordEleven] = useState('')
  const [wordFourteen, setWordFourteen] = useState('')

  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  //add UseEffect when state changes to reload it and store it
  useEffect(() => {
    if (state.password) {
      history.push("/drive/root");
      window.location.reload();
    }
  }, [state.userData]);

  async function onRegister() {
    console.log(state.mnemonic);
    
    if(!state.mnemonic) return null
    const seedWords = state.mnemonic.split(" ")

    if(
      seedWords.length >= 14 &&
      wordFive === seedWords[4] &&
      wordEleven === seedWords[10] &&
      wordFourteen === seedWords[13]
    ){
      // TODO
      console.log("Continue");
    }

    
  }

  return (
    <div className={classes.Login}>
      <div className={classes.title}>Continue without single-sign-on</div>

      <div className={classes.description}>
        Depending on the option you choose, you’ll either get to log back in or register a new account. All of this will be automatically determined for you.
      </div>

      <div className={classes.flexer}></div>

      <TextField
        placeholder="Word #5"
        type="text"
        setHasError={setHasError}
        setProp={setWordFive}
        onContinue={onRegister}
      ></TextField>

      <TextField
        placeholder="Word #11"
        type="text"
        setHasError={setHasError}
        setProp={setWordEleven}
        onContinue={onRegister}
      ></TextField>

      <TextField
        placeholder="Word #14"
        type="text"
        setHasError={setHasError}
        setProp={setWordFourteen}
        onContinue={onRegister}
      ></TextField>



      {/* TODO 3 word inputs to check seeed */}

      {hasError ? <div className={classes.errormsg}>Could not login.</div> : ""}
      <Button text={"Register"} clickFunction={onRegister}></Button>
    </div>
  );
}

export default React.memo(SeedPhraseConfirm);
