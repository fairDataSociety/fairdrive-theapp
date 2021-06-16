import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./fileModalStyles";
import Modal from "@material-ui/core/Modal";
import FileCard from "../cards/fileCard";
import { InfoIcon } from "../icons/icons";
import ButtonPill from "../buttonPill/buttonPill";
import writePath from "../../store/helpers/writePath";
import { fileDownload, filePreview } from "../../store/services/fairOS";
import prettyBytes from "pretty-bytes";
import moment from "moment";
import urlPath from "src/store/helpers/urlPath";
export interface Props {
  file: any;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
}

function FileModal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const { Icon, file, downloadFile } = props;

  const [fileSize, setFileSize] = useState("");
  const [fileCreateDate, setFileCreateDate] = useState("");
  const [fileModDate, setFileModDate] = useState("");
  const [blob, setBlob] = useState(null);
  let blobFile;

  useEffect(() => {
    if (file.size) {
      setFileSize(prettyBytes(parseInt(file.size)));
      setFileCreateDate(moment.unix(file.creation_time).format("DD/MM/YYYY"));
      setFileModDate(moment.unix(file.modification_time).format("DD/MM/YYYY"));
    }
  }, [file]);

  const handleOpen = async () => {
    const newPath = writePath(state.directory);

    blobFile = window.URL.createObjectURL(
      await filePreview(file.name, urlPath(path))
    );
    setBlob(blobFile);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    URL.revokeObjectURL(blobFile);
  };
  async function handleDownload() {
    const newPath = writePath(state.directory);
    await fileDownload(
      newPath + props.file.name,
      props.file.name,
      state.directory
    ).catch((e) => console.error(e));
  }
  const classes = useStyles({ ...props, ...theme });

  return (
    <div>
      <div onClick={handleOpen}>
        <FileCard file={props.file} />
      </div>
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.fileModal} onClick={handleOpen}>
          <div className={classes.header}>Previewing File</div>

          <div className={classes.iconContainer}>
            {!file.content_type.includes("image") && (
              <InfoIcon className={classes.Icon} />
            )}
            {file.content_type.includes("image") && (
              <img className={classes.imagePreview} src={blob}></img>
            )}
          </div>

          <p className={classes.title}>{file.name}</p>
          <div className={classes.fileInfoContainer}>
            <div className={classes.leftContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>Created</p>
                <p>{fileCreateDate}</p>
              </div>
              <div>
                <p className={classes.label}>File size</p>
                <p>{fileSize}</p>
              </div>
            </div>
            <div className={classes.rightContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>Modified</p>
                <p>{fileModDate}</p>
              </div>
              <div>
                <p className={classes.label}>File type</p>
                <p>{file.content_type}</p>
              </div>
            </div>
          </div>
          <div>
            <ButtonPill
              clickFunction={handleDownload}
              text={"Download"}
              textColor={"white"}
            ></ButtonPill>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(FileModal);
