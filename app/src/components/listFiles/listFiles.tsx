import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./listFilesStyles";
import FileCard from "../fileCard/fileCard";
export interface Props {
  password: string;
  files: any;
  setFile: any;
}

function ListFiles(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.ListFiles}>
      {props.files.map((file) => (
        <FileCard file={file} setFile={props.setFile}></FileCard>
      ))}
    </div>
  );
}

export default React.memo(ListFiles);
