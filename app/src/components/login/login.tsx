import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loginStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
import { useHistory, Redirect } from "react-router-dom";
export interface Props {}

function Login(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  //add UseEffect when state changes to reload it and store it
  useEffect(() => {
    if (state.password) {
      history.push("/drive/root");
      window.location.reload();
    }
  }, [state.userData]);

  async function onLogin() {
    await actions.userLogin({
      username,
      password,
      podName: "Fairdrive",
    });
  }

  return (
    <div className={classes.Login}>
      {state.password && <Redirect to={"/drive/root"} />}
      <div className={classes.title}>Login to Fairdrive app</div>
      <div className={classes.flexer}></div>

      <TextField
        placeholder="Username"
        type="text"
        setHasError={setHasError}
        setProp={setUsername}
        onContinue={onLogin}
      ></TextField>

      <TextField
        placeholder="Password"
        type="password"
        setHasError={setHasError}
        setProp={setPassword}
        onContinue={onLogin}
      ></TextField>
      {hasError ? <div className={classes.errormsg}>Could not login.</div> : ""}
      <Button text={"Login"} clickFunction={onLogin}></Button>
      <ButtonLink label="Back" color="grey" path="/"></ButtonLink>
    </div>
  );
}

export default React.memo(Login);
