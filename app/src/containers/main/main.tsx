import React, { useContext, useEffect, useState } from "react";
import useStyles from "./mainStyles";
import ButtonPill from "../../components/buttonPill/buttonPill";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
import Home from "../home/home";
import LoginRegisterPage from "../loginRegisterPage/loginRegisterPage";

export interface Props {}

function Main(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  useEffect(() => {
    console.log(state.userData);
  }, [state.userData]);
  return (
    <div className={classes.Main}>
      {state.userData?.code === 200 ? (
        <Home></Home>
      ) : (
        <LoginRegisterPage></LoginRegisterPage>
      )}
    </div>
  );
}
export default React.memo(Main);
