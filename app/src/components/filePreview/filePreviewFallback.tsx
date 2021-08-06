import React from "react";
import useStyles from "./filePreviewStyles";
import { File, Directory } from "../icons/icons";

const FilePreviewFallback = (props: { file: any, isDirectory?: boolean }) => {
  const classes = useStyles();
  const ext = props.file.name.split(".").pop();

  return (
    <div className={classes.iconContainer}>
      {props.isDirectory ? <Directory /> : <File /> }
      {!props.isDirectory ? <div className={classes.mimeType}>{ext}</div> : null}
    </div>
  );
};

export default FilePreviewFallback;
