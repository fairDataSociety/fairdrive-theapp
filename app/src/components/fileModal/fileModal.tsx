import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./fileModalStyles";
import Modal from "@material-ui/core/Modal";
import FileCard from "../cards/fileCard";
import { InfoIcon, Folder, Close, Download, Upload, Hide, Share, UploadIcon } from "../icons/icons";
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
  open?: boolean
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
    if(!open){
    const newPath = writePath(state.directory);

    blobFile = window.URL.createObjectURL(
      await filePreview(file.name, urlPath(state.directory), state.podName)
    );
    setBlob(blobFile);
    setOpen(true);
    }
  };

  const handleClose = async () => {
    if(open){
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
      <div  onClick={handleOpen}>
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
          <div className={classes.headerWrapper}>
          <Folder className={classes.headerIcon}/><div className={classes.header}>Preview File</div> <Close className={classes.closeIcon}  onClick={handleClose}/>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.iconContainer}>
            {!file.content_type.includes("image") && (
              <InfoIcon className={classes.Icon} />
            )}
            {file.content_type.includes("image") && (
              <img className={classes.imagePreview} src={blob}></img>
            )}
          </div>
          <div className={classes.divider}></div>
          <div className={classes.titleWrapper}>
          <p className={classes.title}>{file.name}</p>
          <p className={classes.fileLocation}>{'/' + urlPath(state.directory)}</p>
          </div>
          <div className={classes.fileInfoContainer}>
            <div className={classes.leftContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>File size</p>
                <p className={classes.value}>{fileSize}</p>
              </div>
              <div>
                <p className={classes.label}>Created</p>
                <p className={classes.value}>{fileCreateDate}</p>
              </div>
            </div>
            <div className={classes.rightContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>Modified</p>
                <p className={classes.value}>{fileModDate}</p>
              </div>
              <div>
                <p className={classes.label}>File type</p>
                <p className={classes.value}>{file.content_type}</p>
              </div>
            </div>
          </div>
          <div className={classes.actionBar}>
          <Hide className={classes.icon} onClick={handleDownload}/>
           <Share className={classes.icon} onClick={handleDownload}/>
           <Download className={classes.icon} onClick={handleDownload}/>
           <UploadIcon className={classes.icon} onClick={handleDownload}/>
          </div>
    
         
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(FileModal);
