import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./fileCardStyles";
import { InfoIcon } from "../icons/icons";

export interface Props {
  file: any;
  setFile: any;
}

function FileCard(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const downloadFile = () => {
    props.setFile(props.file);
  };
  return (
    <div className={classes.fileCard}>
      <div className={classes.iconContainer}>
        <InfoIcon className={classes.icon} />
      </div>
      <p className={classes.fileName}>{props.file.name}</p>
      <label className={classes.fileSize}>{props.file.size}</label>
    </div>
  );
}

export default React.memo(FileCard);
