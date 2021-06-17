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
  disabledButton?: string;
  icon?: boolean;
  confirmMessage?: string;
  notifyMessage?: string;
  errorMessage?: string;
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
          {props.icon && <ModalFolder className={classes.icon} />}
          {props.heading}
          <Close className={classes.closeIcon} onClick={props.handleClick} />
        </div>
        <div className={classes.flex}>
          <div className={classes.body}>{props.children}</div>
          {props.confirmMessage && (
            <p className={classes.confirmMessage}>
              You are about to confirm this link.
            </p>
          )}
          {props.notifyMessage && (
            <p className={classes.notifyMessage}>
              You are about to confirm this link.
            </p>
          )}
          {props.errorMessage && (
            <p className={classes.errorMessage}>
              You are about to confirm this link.
            </p>
          )}
          <div className={classes.buttonContainer}>
            {props.button && (
              <button className={classes.button}>{props.button}</button>
            )}
            {props.disabledButton && (
              <button className={classes.disabledButton}>
                {props.disabledButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(Modal);
