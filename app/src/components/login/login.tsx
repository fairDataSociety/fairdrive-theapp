import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loginStyles";
import ButtonPill from "../buttonPill/buttonPill";
import TextField from "../textField/textField";
import welcomeImage from "../../media/images/welcome-image.png";

export interface Props {
  backFunction: any;
}

function Login(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);
  //add UseEffect when state changes to reload it and store it

  async function onLogin() {
    actions.userLogin({
      username,
      password,
      podName: "Fairdrive",
    });
    actions.getPods();
  }

  useEffect(() => {
    console.log(state.pods);
  }, [state.pods]);
  return (
    <div className={classes.Login}>
      <div className={classes.imageContainer}>
        <img
          alt="lego man for login"
          className={classes.image}
          src={welcomeImage}
        />
      </div>

      <div className={classes.loginContainer}>
        <div className={classes.header}>
          <div className={classes.title}>Account Credentials</div>
          <p>
            Depending on the option you choose, you’ll either get to log back in
            or register a new account. All of this will be automatically
            determined for you.
          </p>
        </div>

        <TextField
          placeholder="Username"
          type="text"
          setHasError={setHasError}
          setProp={setUsername}
          onContinue={onLogin}
        />

        <TextField
          placeholder="Password"
          type="password"
          setHasError={setHasError}
          setProp={setPassword}
          onContinue={onLogin}
        />

        {hasError && <div className={classes.errormsg}>Could not login.</div>}
        <ButtonPill text={"Login"} clickFunction={onLogin} />
        <ButtonPill
          text="Back"
          color="grey"
          clickFunction={props.backFunction}
        />
      </div>
    </div>
  );
}

export default React.memo(Login);
