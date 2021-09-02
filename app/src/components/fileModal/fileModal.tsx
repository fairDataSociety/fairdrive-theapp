import React, { useContext, useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';

// Hooks
import { useFileContextActions } from 'src/hooks/useFileContextActions';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Components
import useStyles from './fileModalStyles';
import Modal from '@material-ui/core/Modal';
import FilePreview from '../filePreview/filePreview';
import FileCard from '../cards/fileCard';
import { Folder, Close, Download, Hide, Share, Globe } from '../icons/icons';

// Helpers
import { shortenTitle } from 'src/helpers/utils';
import urlPath from 'src/helpers/urlPath';
import GenerateLink from '../modals/generateLink/generateLink';

// Types
import { IFile } from 'src/types/models/File';
import { Tooltip } from '@material-ui/core';
export interface Props {
  file: IFile;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
  open?: boolean;
}

function FileModal(props: Props) {
  // General
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  // States
  const [open, setOpen] = React.useState(false);
  const [openShareLink, setOpenShareLink] = React.useState(false);
  const { file } = props;

  const [fileSize, setFileSize] = useState('');
  const [fileCreateDate, setFileCreateDate] = useState('');
  const [fileModDate, setFileModDate] = useState('');
  const [refLink, setRefLink] = useState('');

  // File Context Actions
  const { handleDelete, handleDownload, handleShare } = useFileContextActions();

  // Proxy file context actions calls
  const proxyFileContextActions = async (
    type: 'delete' | 'download' | 'share'
  ) => {
    switch (type) {
      case 'delete':
        await handleDelete(props.file.name).then(() => setOpen(false));
        break;
      case 'download':
        await handleDownload(props.file.name);
        break;
      case 'share':
        await handleShare(props.file.name).then((response) => {
          setRefLink(response);
          setOpenShareLink(true);
        });
        break;
      default:
        console.warn(`proxyFileContextActions: Unknown action type of ${type}`);
        break;
    }
  };

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
        <>
          <div className={classes.fileModal} onClick={handleOpen}>
            <div className={classes.headerWrapper}>
              <Folder className={classes.headerIcon} />
              <div className={classes.header}>Preview File</div>{' '}
              <Close
                className={classes.closeIcon}
                onClick={() => setOpen(false)}
              />
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
              {state.podName === 'Consents' && (
                <Tooltip title="Open in dapp" className={classes.tooltip}>
                  <a
                    href={`http://localhost:3000/consents/${state.podName}/${state.directory}/${file.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className={classes.icon}>
                      <title>Open in dapp</title>
                    </Globe>
                  </a>
                </Tooltip>
              )}
              <Hide
                className={classes.icon}
                onClick={() => proxyFileContextActions('delete')}
              />
              <Share
                className={classes.icon}
                onClick={() => proxyFileContextActions('share')}
              />
              <Download
                className={classes.icon}
                onClick={() => proxyFileContextActions('download')}
              />
              {/* <UploadIcon className={classes.icon} onClick={handleDownload} /> */}
            </div>
          </div>
        </>
      </Modal>
      <Modal
        className={classes.generateLinkWrapper}
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
