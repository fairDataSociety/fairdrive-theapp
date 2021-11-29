import React from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './listViewStyles';

export interface Props {
  children: React.ReactNode;
}

function ListView(props: Props) {
  const { children } = props;
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return <div className={classes.container}>{children}</div>;
}

export default React.memo(ListView);
