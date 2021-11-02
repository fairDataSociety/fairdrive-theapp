import React from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './fileListHeaderStyles';

export interface Props {
  isPodBarOpen: boolean;
}
function FileListHeader(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.headerwrapper}>
      <div className={classes.fileName}>File Name</div>
      <div className={classes.fileInfo}>File Type</div>
      <div className={classes.fileInfo}>File Size</div>
      <div className={classes.fileInfo}>Created</div>
      <div className={classes.fileInfo}>Modified</div>
    </div>
  );
}
export default React.memo(FileListHeader);
