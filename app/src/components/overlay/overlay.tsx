import React from 'react';
import useStyles from './overlayStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

export interface Props {
  handleClickAway?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

function Overlay(props: Props): JSX.Element {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return (
    <>
      <div
        onClick={() => props.handleClickAway()}
        className={classes.Overlay}
      />
      <div className={classes.children}>{props.children}</div>
    </>
  );
}

export default React.memo(Overlay);
