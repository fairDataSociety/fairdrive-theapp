import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import Button from "../button/button";
import useStyles from "./uploadFileStyles";

export interface Props {
  file: any;
  setUploadRes: any;
}

function ShareFile(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [filename, setFilename] = useState("");

  const classes = useStyles({ ...props, ...theme });
  const handleSetFilename = (e: any) => {
    setFilename(e.target.value);
  };
  function handleSubmit(e: any) {
    if (e.charCode === 13) {
      shareFile();
    }
  }
  useEffect(() => {
    props.setUploadRes(state.fileUploaded);
  }, [state.fileUploaded]);

  const shareFile = async () => {
    try {
      await actions.sendFile({
        file: props.file,
        filename: filename,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.dialogBox}>
      <div className={classes.title}>Save file</div>
      <div className={classes.flexer}></div>
      <input
        id="username"
        className={classes.dialogText}
        type="text"
        placeholder="File name"
        onKeyPress={(e) => handleSubmit(e)}
        onChange={(e) => handleSetFilename(e)}
      ></input>
      <div className={classes.flexer}></div>
      <Button text={"Save file"} clickFunction={shareFile}></Button>
    </div>
  );
}

export default React.memo(ShareFile);
