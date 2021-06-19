import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./fileListStyles";

export interface Props {
  isPodBarOpen: boolean;
}
function FileListHeader(props: Props) {
  const { theme } = useContext(ThemeContext);
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
