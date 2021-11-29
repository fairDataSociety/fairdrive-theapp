import React from 'react';
import useStyles from './listViewBodyStyles';
import { useTheme } from 'src/contexts/themeContext/themeContext';

export interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function ListViewBody(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return <div className={classes.wrapper}>{props.children}</div>;
}

export default React.memo(ListViewBody);
