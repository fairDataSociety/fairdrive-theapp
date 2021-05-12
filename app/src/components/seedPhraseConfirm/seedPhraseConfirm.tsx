import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "../register/registerStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import { useHistory, Redirect } from "react-router-dom";
import {
  createAccount,
  createDirectory,
  createPod,
  openPod,
} from "../../store/services/fairOS";
export interface Props {}

function SeedPhraseConfirm(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [wordFive, setWordFive] = useState("");
  const [wordEleven, setWordEleven] = useState("");
  const [wordTwelve, setWordTwelve] = useState("");
  const [registerLoader, setRegisterLoader] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [podCreated, setPodCreated] = useState(false);
  const [folderCreated, setFolderCreated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function createNewPod() {
      if (state.address) {
        try {
          setUserCreated(true);
          await createPod(state.password);

          setPodCreated(true);
          await createDirectory("Documents");
          await createDirectory("Movies");
          await createDirectory("Music");
          await createDirectory("Pictures");
          setFolderCreated(true);
          history.push("/drive/root");
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [state.address]);
  async function onRegister() {
    console.log("in confirm component", state.mnemonic);

    if (!state.mnemonic) return null;
    const seedWords = state.mnemonic.split(" ");

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
      await createPod(state.password);

      setPodCreated(true);
      await createDirectory("Documents");
      await createDirectory("Movies");
      await createDirectory("Music");
      await createDirectory("Pictures");
      setFolderCreated(true);
      history.push("/drive/root");
      setRegisterLoader(true);
    }
  }

  return (
    <div>
      {!registerLoader && (
        <div className={classes.Login}>
          <div className={classes.title}>Continue without single-sign-on</div>

          <div className={classes.description}>
            Depending on the option you choose, you’ll either get to log back in
            or register a new account. All of this will be automatically
            determined for you.
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
            placeholder="Word #12"
            type="text"
            setHasError={setHasError}
            setProp={setWordTwelve}
            onContinue={onRegister}
          ></TextField>

          <Button text={"Register"} clickFunction={onRegister}></Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(SeedPhraseConfirm);
