import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./uploadModalStyles";
import Modal from "@material-ui/core/Modal";
import FileCard from "../cards/fileCard";
import {
  InfoIcon,
  Folder,
  Close,
  UploadIcon,
} from "../icons/icons";
import writePath from "../../store/helpers/writePath";
import { fileDownload, filePreview } from "../../store/services/fairOS";
import prettyBytes from "pretty-bytes";
import moment from "moment";
import urlPath from "src/store/helpers/urlPath";
export interface Props {
  file?: any;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
  open?: boolean;
  children: any;
  handleUploadModal: (value) => void;
}

function UploadModal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(props.open);
  const {  file } = props;

  const [blob, setBlob] = useState(null);
  let blobFile;

  

  const handleOpen = async () => {
    const newPath = writePath(state.directory);

    // blobFile = window.URL.createObjectURL(
    //   await filePreview(file.name, urlPath(state.directory), state.podName)
    // );
    // setBlob(blobFile);
    setOpen(true);
  };

  const handleClose = async () => {
    if (open) {
      URL.revokeObjectURL(blobFile);
      setBlob(null);
      setOpen(false);
    }
  };
  async function handleDownload() {
    const newPath = writePath(state.directory);
    await fileDownload(
      props.file.name,
      urlPath(state.directory),
      state.podName
    ).catch((e) => console.error(e));
  }
  const classes = useStyles({ ...props, open, ...theme });

  return (
    <div>
      <div onClick={handleOpen}>
     {props.children}
      </div>
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.fileModal} onClick={handleOpen}>
          <div className={classes.headerWrapper}>
            <Folder className={classes.headerIcon} />
            <div className={classes.header}>Upload File</div>{" "}
            <Close className={classes.closeIcon} onClick={handleClose} />
          </div>
          <div className={classes.divider}></div>
          <div className={classes.iconContainer}>
            {file && !file.content_type.includes("image") && (
              <InfoIcon className={classes.Icon} />
            )}
            {file && file.content_type.includes("image") && (
              <img className={classes.imagePreview} src={blob}></img>
            )}
          </div>
          <div className={classes.divider}></div>
    
          <div className={classes.actionBar}>
            <UploadIcon className={classes.icon} onClick={handleDownload} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(UploadModal);
