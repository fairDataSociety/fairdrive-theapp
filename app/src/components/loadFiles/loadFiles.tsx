import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./loadFilesStyles";
import Button from "../button/button";

export interface Props {
  setFiles: any;
  password: any;
}

function LoadFiles(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  async function getDirectory() {
    try {
      await actions.getDirectory({
        directory: "root",
        password: state.password,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Button
      text={"Load Files"}
      setFiles={props.setFiles}
      clickFunction={getDirectory}
    ></Button>
  );
}

export default React.memo(LoadFiles);
