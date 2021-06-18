import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./downloadStyles";
import Modal from "../modal/modal";
import TextField from "../../textField/textField";

export interface Props {
  setProp: any,
  type: string;
}

export function Download(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading={`Download ${props.type}`} icon={true} button='Download'>
      <p className={classes.label}>Destination</p>
      <TextField
         placeholder={`Choose Destination on your local storage`}
          setProp={props.setProp}
          type="text"
      ></TextField>
      <p>{`You are about to download this ${props.type}`}</p>
    </Modal>
  );
}