import React, { useContext, useEffect, useState } from "react";
import useStyles from "./mainStyles";
import ButtonPill from "../../components/buttonPill/buttonPill";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
import Login from "../../components/login/login";
import Home from "../home/home";
import Register from "../../components/register/register";

export interface Props {}

function Main(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [showRegisterComponent, setShowRegisterComponent] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const classes = useStyles({ ...props, ...theme });
  useEffect(() => {
    console.log(state.userData);
  }, [state.userData]);
  return (
    <div className={classes.Main}>
      {state.userData?.code === 200 ? (
        <Home></Home>
      ) : (
        !showRegisterComponent &&
        !showLoginComponent && (
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
        )
      )}
      {state.userData?.code !== 200 && showLoginComponent && (
        <Login
          backFunction={() => {
            setShowLoginComponent(false);
            setShowRegisterComponent(false);
          }}
        ></Login>
      )}
      {state.userData?.code !== 200 && showRegisterComponent && (
        <Register></Register>
      )}
    </div>
  );
}
export default React.memo(Main);
