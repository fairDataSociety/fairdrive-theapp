import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./registerStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import { useHistory, Redirect } from "react-router-dom";
export interface Props { }

function Login(props: Props) {
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
  }

  return (
    <div className={classes.Login}>
      {state.password && <Redirect to={"/drive/root"} />}
      <div className={classes.title}>Account Credentials</div>

      <div className={classes.description}>Depending on the option you choose, you’ll either get to log back in or register a new account. All of this will be automatically determined for you.</div>

      <div className={classes.flexer}></div>

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

      <TextField
        placeholder="Invite Code"
        type="text"
        setHasError={setHasError}
        setProp={setInviteCode}
        onContinue={onContinue}
      ></TextField>
      {hasError ? <div className={classes.errormsg}>Could not login.</div> : ""}
      <Button text={"Continue"} clickFunction={onContinue}></Button>
    </div>
  );
}

export default React.memo(Login);
