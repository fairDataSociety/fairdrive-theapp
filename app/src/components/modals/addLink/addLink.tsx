import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./addLinkStyles";
import Modal from "../modal/modal";
import TextField from "../../textField/textField";

export interface Props {
  setProp: any;
}

function AddLink(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      heading="Add Link/Pod"
      icon={true}
      button="Confirm"
      confirmMessage="You are about to confirm this link."
    >
      <p className={classes.label}>Link shared with you</p>
      
      <TextField
         placeholder={`Paste link here`}
          setProp={props.setProp}
          type="text"
      ></TextField>
      <input className={classes.input} placeholder="Paste link here" />
    </Modal>
  );
}

export default React.memo(AddLink);
