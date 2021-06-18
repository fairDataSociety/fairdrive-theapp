import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./connectToFairdriveStyles";
import Modal from "../modal/modal";
import TextField from "src/components/textField/textField";

export interface Props {
  setProp: any;
}

function ConnectToFairdrive(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading='Connect to Fairdrive' button='Authorize'>
      <p className={classes.label}>USERNAME</p>
      <TextField
         placeholder={`Enter here...`}
          setProp={props.setProp}
          type="text"
      ></TextField>
      <p className={classes.label}>PASSWORD</p>
      <TextField
         placeholder={`Enter here...`}
          setProp={props.setProp}
          type="text"
      ></TextField>
    </Modal>
  );
}

export default React.memo(ConnectToFairdrive);
