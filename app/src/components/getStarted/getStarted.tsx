import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./getStartedStyles";
import { StartFolder } from "../icons/icons";

export interface Props {}

function GetStarted(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.container}>
      <StartFolder className={classes.icon}/>
      <p className={classes.header}>Get started with your Drive</p>
      <p className={classes.body}>Start interacting with the Fairdrive ecosystem, create your Subpods and explore new ways to organize your files.</p>
      <button className={classes.button}>Upload your first file</button>    
    </div>
  );
}

export default React.memo(GetStarted);
