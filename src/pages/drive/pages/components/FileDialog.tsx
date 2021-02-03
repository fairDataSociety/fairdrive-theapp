import React, { useEffect, useRef, useState } from "react";
import styles from "../../drive.module.css";
import urlPath from "helpers/urlPath";
import rootStyles from "styles.module.css";
import prettyBytes from "pretty-bytes";
import moment from "moment";
import {
  AddCircleOutline,
  Cloud,
  Folder,
  HighlightOff,
  LibraryMusic,
  Subject,
  FileCopySharp,
} from "@material-ui/icons/";
import { CircularProgress, LinearProgress } from "@material-ui/core";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  mdiFolder,
  mdiFolderPlus,
  mdiFolderEdit,
  mdiSettingsHelper,
  mdiShare,
  mdiTrashCan,
  mdiUpload,
  mdiZipBox,
} from "@mdi/js";
import Icon from "@mdi/react";
import { fileDownload } from "helpers/apiCalls";

export default function FileDialog({ open, path, item, refresh, onClose }) {
  const homeId = "homeId";

  //const [openNew, setNewOpen] = useState(open);
  const [fileDialogContentState, setFileDialogContentState] = useState(homeId);
  const [fileSize, setFileSize] = useState(0);
  const [fileCreateDate, setFileCreateDate] = useState();
  const [fileModDate, setFileModDate] = useState();

  function handleFileDialogClose() {
    setFileDialogContentState(homeId);
    onClose();
  }

  useEffect(() => {
    if (item.size) {
      setFileSize(prettyBytes(parseInt(item.size)));
      setFileCreateDate(moment.unix(item.creation_time).from());
      setFileModDate(moment.unix(item.modification_time).from());
    }
  }, [item]);

  async function handleDownload() {
    let writePath = "";
    if (path == "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(path) + "/";
    }
    await fileDownload(writePath + item.name, item.name).catch((e) =>
      console.error(e)
    );
  }

  const FileDialogContent = () => {
    switch (fileDialogContentState) {
      case homeId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFileDialogClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>{item.name}</div>
            <div className={styles.fileProps}>Type: {item.content_type}</div>
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
    <Dialog open={open} fullWidth="fullWidth">
      <div className={styles.dialogContainer}>{FileDialogContent()}</div>
    </Dialog>
  );
}
