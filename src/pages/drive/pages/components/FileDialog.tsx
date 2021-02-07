import React, { useEffect, useRef, useState } from "react";
import styles from "../../drive.module.css";
import urlPath from "../../../../helpers/urlPath";
import rootStyles from "styles.module.css";
import prettyBytes from "pretty-bytes";
import moment from "moment";

import { Dialog } from "@material-ui/core";

import { fileDownload } from "../../../../helpers/apiCalls";

export interface Props {
  open: any;
  path: any;
  item: any;
  refresh: any;
  onClose: any;
}
function FileDialog(props: Props) {
  const homeId = "homeId";

  //const [openNew, setNewOpen] = useState(open);
  const [fileDialogContentState, setFileDialogContentState] = useState(homeId);
  const [fileSize, setFileSize] = useState(0);
  const [fileCreateDate, setFileCreateDate] = useState({});
  const [fileModDate, setFileModDate] = useState({});

  function handleFileDialogClose() {
    setFileDialogContentState(homeId);
    props.onClose();
  }

  useEffect(() => {
    if (props.item.size) {
      setFileSize(Number(prettyBytes(parseInt(props.item.size))));
      setFileCreateDate(moment.unix(props.item.creation_time));
      setFileModDate(moment.unix(props.item.modification_time));
    }
  }, [props.item]);

  async function handleDownload() {
    let writePath = "";
    if (props.path == "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(props.path) + "/";
    }
    await fileDownload(
      writePath + props.item.name,
      props.item.name
    ).catch((e) => console.error(e));
  }

  const FileDialogContent = () => {
    switch (fileDialogContentState) {
      case homeId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFileDialogClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>{props.item.name}</div>
            <div className={styles.fileProps}>
              Type: {props.item.content_type}
            </div>
            <div className={styles.fileProps}>Filesize: {fileSize}</div>
            <div className={styles.fileProps}>Created: {fileCreateDate}</div>
            <div className={styles.fileProps}>Modified: {fileModDate}</div>
            <div onClick={handleDownload} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>{">"} download</div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };
  return (
    <Dialog open={props.open} fullWidth={true}>
      <div className={styles.dialogContainer}>{FileDialogContent()}</div>
    </Dialog>
  );
}
export default React.memo(FileDialog);
