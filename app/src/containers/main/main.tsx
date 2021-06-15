import React, { useContext, useState } from "react";
import useStyles from "./mainStyles";
import ButtonPill from "../../components/buttonPill/buttonPill";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { Redirect } from "react-router-dom";
import Login from "../../components/login/login";
import Register from "../../components/register/register";

export interface Props {}

function Main(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [showRegisterComponent, setShowRegisterComponent] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const classes = useStyles({ ...props, ...theme });
  return (
    <div className={classes.Main}>
      {/* <Login></Login> */}
      {state.password && <Redirect to={"/drive/root"} />}
      {!showRegisterComponent && !showLoginComponent && (
        <div className={classes.loginRegisterButtons}>
          {" "}
          <ButtonPill
            text="Login"
            color="grey"
            clickFunction={() => {
              setShowLoginComponent(true);
              setShowRegisterComponent(false);
            }}
          />
          <ButtonPill
            text="Register"
            color="grey"
            clickFunction={() => {
              setShowLoginComponent(false);
              setShowRegisterComponent(true);
            }}
          />
        </div>
      )}
      {showLoginComponent && (
        <Login
          backFunction={() => {
            setShowLoginComponent(false);
            setShowRegisterComponent(false);
          }}
        ></Login>
      )}
      {showRegisterComponent && <Register></Register>}
    </div>
  );
}
export default React.memo(Main);
