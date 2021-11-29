import React from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './listViewHeaderStyles';

export interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
}
function ListViewHeader(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return <div className={classes.headerwrapper}>{props.children}</div>;
}
export default React.memo(ListViewHeader);
