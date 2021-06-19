import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./createNewStyles";
import TextField from "../../textField/textField";
import Modal from "../modal/modal";

export interface Props {
  type: string;
  handleClick: () => void;
  handleClose: () => void;
  setProp?: any;
}

export function CreateNew(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      handleClose={props.handleClose}
      heading={`Create New ${props.type}`}
      icon={true}
      button="Create"
      handleClick={props.handleClick}
    >
      <p className={classes.label}>Name your {props.type}</p>
      <TextField
        placeholder={`${props.type} Name`}
        setProp={props.setProp}
        type="text"
      ></TextField>
      <p>You are about to create a new {props.type}</p>
    </Modal>
  );
}

export default React.memo(CreateNew);
