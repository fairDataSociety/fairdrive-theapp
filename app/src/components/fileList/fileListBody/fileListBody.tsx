import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./fileListBodyStyles";
import { Kebab } from "../../icons/icons";

export interface Props {
  file: unknown;
  name: string;
  type: string;
  size: string;
  created: string;
  modified: string;
  isPodBarOpen: boolean;
}
function FileListBody(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  // const { name, type, size, created, modified } = props.file;
  return (
    <div className={classes.fileWrapper}>
      <div className={classes.fileName}>{props.name}</div>
      <div className={classes.fileInfo}>{props.type}</div>
      <div className={classes.fileInfo}>{props.size}</div>
      <div className={classes.fileInfo}>{props.created}</div>
      <div className={classes.fileInfo}>{props.modified}</div>
      <Kebab onClick={() => {}} />
    </div>
  );
}

export default React.memo(FileListBody);