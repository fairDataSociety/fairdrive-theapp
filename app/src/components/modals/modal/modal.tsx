import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import ClickAwayListener from "react-click-away-listener";
import { Close, ModalFolder } from "../../icons/icons";
import useStyles from "./modalStyles";

export interface Props {
  children?: React.ReactNode;
  handleClick?: () => void;
  heading: string;
  button?: string;
}

function Modal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const handleClickAway = () => {
    console.log("");
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <ModalFolder className={classes.icon} />
          {props.heading}
          <Close className={classes.closeIcon} onClick={props.handleClick} />
        </div>
        <div>{props.children}</div>
        <div className={classes.buttonContainer}>
          <button className={classes.button}>{props.button}</button>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(Modal);
