import React, { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Hooks
import useStyles from './uploadStyles';

// Helpers
import urlPath from 'src/helpers/urlPath';

// Components
import Modal from '@material-ui/core/Modal';
import {
  InfoIcon,
  Folder,
  Close,
  UploadIcon,
} from 'src/components/icons/icons';
import UploadProgress from './partials/uploadProgress/uploadProgress';

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
  handleClose?: () => void;
  visible?: boolean;
  filesToUpload?: FileList;
}

function FilePlaceHolder({ handleFileUpload }) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const inputFile = useRef(null);

  const onIconClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <div className={classes.filesPlaceHolder} onClick={onIconClick}>
      <UploadIcon className={classes.icon} />

      <div className={classes.uploadDescription}>
        Click or drag here to upload
      </div>
      <input
        className={classes.uploadInput}
        type="file"
        ref={inputFile}
        multiple
        onChange={(e) => handleFileUpload(e.target.files)}
      ></input>
    </div>
  );
}

function UploadModal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState(null);

  const [blob, setBlob] = useState(null);
  let blobFile;

  useEffect(() => {
    if (props.filesToUpload && props.filesToUpload instanceof FileList) {
      handleFileUpload(props.filesToUpload);
    }
  }, [props.filesToUpload]);

  async function handleFileUpload(files: FileList) {
    Array.from(files).forEach((file) => {
      blobFile = URL.createObjectURL(file);
      setFile(file);
      setBlob(blobFile);

      actions.uploadFile({
        files,
        directory: urlPath(state.directory),
        podName: state.podName,
      });
    });
  }
  useEffect(() => {
    handleClose();
  }, [state.entries]);

  const handleClose = async () => {
    if (open) {
      URL.revokeObjectURL(blobFile);
      setBlob(null);
      setFile(null);
    }

    props.handleClose();
  };

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      className={classes.modalContainer}
      open={props.visible}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.fileModal}>
        <div className={classes.headerWrapper}>
          <Folder className={classes.headerIcon} />
          <div className={classes.header}>Upload File</div>{' '}
          <Close className={classes.closeIcon} onClick={handleClose} />
        </div>
        <div className={classes.divider}></div>

        <div className={classes.iconContainer}>
          {file && !file.type.includes('image') ? (
            <>
              <InfoIcon className={classes.Icon} />
              <img className={classes.imagePreview} src={blob} alt="img"></img>
            </>
          ) : (
            <FilePlaceHolder handleFileUpload={handleFileUpload} />
          )}
        </div>

        <div className={classes.divider}></div>

        <UploadProgress />

        <div className={classes.actionBar}></div>
      </div>
    </Modal>
  );
}

export default React.memo(UploadModal);
