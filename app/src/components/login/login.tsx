import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loginStyles";
import Button from "../button/button";
import ButtonLink from "../buttonLink/buttonLink";
import TextField from "../textField/textField";
export interface Props {}

function Login(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);

  const handleSetUsername = (e: any) => {
    setUsername(e.target.value);
    setHasError(false);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
    setHasError(false);
  };

  function handleSubmit(e: any) {
    if (e.charCode === 13) {
      onLogin();
    }
  }

  //add UseEffect when state changes to reload it and store it
  useEffect(() => {
    if (props) {
    }
  }, [state.userData]);

  async function onLogin() {
    // TODO can look at logic from Fairdrive
    // TODO get API calls for this
    const data = await actions.userLogin({
      username,
      password,
      podName: "Fairdrive",
    });
    // setHasError(true);
  }

  return (
    <div className={classes.Login}>
      <div className={classes.title}>Login to Fairdrive app</div>
      <div className={classes.flexer}></div>

      <TextField
        placeholder="Username"
        setHasError={setHasError}
        setProp={setUsername}
        onContinue={onLogin}
      ></TextField>

      <TextField
        placeholder="Password"
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
