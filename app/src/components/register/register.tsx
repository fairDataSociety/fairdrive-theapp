import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./registerStyles";
import ButtonPill from "../buttonPill/buttonPill";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import { useHistory, Redirect } from "react-router-dom";
import { isUsernamePresent } from "../../store/services/fairOS";
export interface Props {}

function Register(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (state.mnemonic !== null) {
      console.log(state.mnemonic);
      history.push("/generate-seed");
    }
  }, [state.mnemonic]);

  async function onContinue() {
    // if (await isUsernamePresent(username)) return false;
    if (!username || !password) return null;
    // TODO validate inputs

    // Store username, password, invite code in store
    const data = {
      username,
      password,
      inviteCode,
    };

    actions.storeUserRegistrationInfo(data);
    actions.getSeedPhrase({});
  }

  return (
    <div className={classes.Login}>
      <div className={classes.title}>Account Credentials</div>

      <div className={classes.description}>
        Depending on the option you choose, you’ll either get to log back in or
        register a new account. All of this will be automatically determined for
        you.
      </div>

      <TextField
        placeholder="Username"
        type="text"
        setHasError={setHasError}
        setProp={setUsername}
        onContinue={onContinue}
      ></TextField>

      <TextField
        placeholder="Password"
        type="password"
        setHasError={setHasError}
        setProp={setPassword}
        onContinue={onContinue}
      ></TextField>

      {/* <TextField
        placeholder="Invite Code"
        type="text"
        setHasError={setHasError}
        setProp={setInviteCode}
        onContinue={onContinue}
      ></TextField> */}
      {hasError ? <div className={classes.errormsg}>Could not login.</div> : ""}
      <ButtonPill text={"Continue"} clickFunction={onContinue}></ButtonPill>
    </div>
  );
}

export default React.memo(Register);
