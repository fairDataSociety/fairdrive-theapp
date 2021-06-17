import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./addLinkStyles";
import Modal from "../modal/modal";

export interface Props {}

function AddLink(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading='Add Link/Pod' icon={true} button='Confirm'>
        <p className={classes.label}>Link shared with you</p>
        <input className={classes.input} placeholder='Paste link here'/>
        <p className={classes.greenlabel}>You are about to confirm this link.</p>
    </Modal>
  );
}

export default React.memo(AddLink);
