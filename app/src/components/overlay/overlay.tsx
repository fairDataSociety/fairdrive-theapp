import React, { useContext } from 'react';
import useStyles from './overlayStyles';
import ClickAwayListener from 'react-click-away-listener';
import { ThemeContext } from '../../store/themeContext/themeContext';

export interface Props {
  handleClickAway?: () => void;
  children: React.ReactElement<any>;
}

function Overlay(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Overlay}>
      <ClickAwayListener onClickAway={props.handleClickAway}>
        {props.children}
      </ClickAwayListener>
    </div>
  );
}

export default React.memo(Overlay);
