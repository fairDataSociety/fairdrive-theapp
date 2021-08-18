import React, { useContext, useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import useStyles from './fileModalStyles';
import Modal from '@material-ui/core/Modal';
import FilePreview from '../filePreview/filePreview';
import FileCard from '../cards/fileCard';
import { Folder, Close, Download, Hide, Share } from '../icons/icons';

// Helpers
import writePath from 'src/helpers/writePath';
import { shortenTitle } from 'src/helpers/utils';
import urlPath from 'src/helpers/urlPath';
import GenerateLink from '../modals/generateLink/generateLink';

// Services
import { downloadFile, shareFile } from 'src/services/file';

// Types
import { IFile } from 'src/types/models/File';
export interface Props {
  file: IFile;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
  open?: boolean;
}

function FileModal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [openShareLink, setOpenShareLink] = React.useState(false);
  const { file } = props;

  const [fileSize, setFileSize] = useState('');
  const [fileCreateDate, setFileCreateDate] = useState('');
  const [fileModDate, setFileModDate] = useState('');
  const [refLink, setRefLink] = useState('');

  const handleCloseShareLink = () => {
    setOpenShareLink(false);
  };
  useEffect(() => {
    if (file.size) {
      setFileSize(prettyBytes(parseInt(file.size)));
      setFileCreateDate(
        moment.unix(parseInt(file.creation_time)).format('DD/MM/YYYY')
      );
      setFileModDate(
        moment.unix(parseInt(file.modification_time)).format('DD/MM/YYYY')
      );
    }
  }, [file]);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (open) {
      setOpen(false);
    }
  };
  const handleDownload = async () => {
    // const newPath = writePath(state.directory);
    await downloadFile(
      props.file.name,
      urlPath(state.directory),
      state.podName
    ).catch((e) => console.error(e));
  };
  const handleShare = async () => {
    const res = await shareFile(
      props.file.name,
      writePath(state.directory),
      state.podName
    );
    setRefLink(res);
    setOpenShareLink(true);
  };
  const handleDelete = async () => {
    actions.deleteFile({
      file_name: props.file.name,
      path: writePath(state.directory),
      podName: state.podName,
    });
    setOpen(false);
  };
  const displayFileName =
    file.name.length > 22 ? shortenTitle(file.name) : file.name;
  const classes = useStyles({ ...props, open, ...theme });

  return (
    <div>
      <div>
        <FileCard
          file={props.file}
          isDirectory={false}
          onFileClick={handleOpen}
        />
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
            <div className={classes.header}>Preview File</div>{' '}
            <Close className={classes.closeIcon} onClick={handleClose} />
          </div>
          <div className={classes.divider}></div>
          <div className={classes.iconContainer}>
            <FilePreview
              file={file}
              contentType={file.content_type}
              filename={file.name}
              directory={urlPath(state.directory)}
              podName={state.podName}
            />
          </div>
          <div className={classes.divider}></div>
          <div className={classes.titleWrapper}>
            <p className={classes.title}>{displayFileName}</p>
            <p className={classes.fileLocation}>
              {'/' + urlPath(state.directory)}
            </p>
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
            <Hide className={classes.icon} onClick={handleDelete} />
            <Share className={classes.icon} onClick={handleShare} />
            <Download className={classes.icon} onClick={handleDownload} />
            {/* <UploadIcon className={classes.icon} onClick={handleDownload} /> */}
          </div>
        </div>
      </Modal>

      <Modal
        className={classes.modalContainer}
        open={openShareLink}
        onClose={handleCloseShareLink}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GenerateLink
          variant="share"
          link={refLink}
          handleClose={handleCloseShareLink}
        ></GenerateLink>
      </Modal>
    </div>
  );
}

export default React.memo(FileModal);
