import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./uploadModalStyles";
import Modal from "@material-ui/core/Modal";
import { InfoIcon, Folder, Close, UploadIcon } from "../icons/icons";
import urlPath from "src/store/helpers/urlPath";
export interface Props {
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
  const [file, setFile] = useState(null);

  const [blob, setBlob] = useState(null);
  let blobFile;
  const inputFile = useRef(null);

  const onIconClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  async function handleFileUpload(files: any) {
    blobFile = URL.createObjectURL(files[0]);
    setFile(files[0]);
    setBlob(blobFile);

    actions.uploadFile({
      files,
      directory: urlPath(state.directory),
      podName: state.podName,
    });
  }
  useEffect(() => {
    handleClose();
  }, [state.entries]);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (open) {
      URL.revokeObjectURL(blobFile);
      setBlob(null);
      setOpen(false);
    }
  };

  const classes = useStyles({ ...props, open, ...theme });

  return (
    <div>
      <div onClick={handleOpen}>{props.children}</div>
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
            {file && !file.type.includes("image") && (
              <InfoIcon className={classes.Icon} />
            )}
            {file && file.type.includes("image") && (
              <img className={classes.imagePreview} src={blob}></img>
            )}
          </div>
          <div className={classes.divider}></div>

          <div className={classes.actionBar}>
            <UploadIcon className={classes.icon} onClick={onIconClick} />
            <input
              className={classes.uploadInput}
              type="file"
              ref={inputFile}
              onChange={(e) => handleFileUpload(e.target.files)}
            ></input>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(UploadModal);
