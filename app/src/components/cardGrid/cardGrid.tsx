import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './cardGridStyles';

export interface Props {
  children: React.ReactNode;
  className?: string;
}

function CardGrid(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const { className = '', children } = props;

  return (
    <div className={`${classes.CardGrid} ${className}`}>
      <div className={classes.grid}>{children}</div>
    </div>
  );
}

export default React.memo(CardGrid);
