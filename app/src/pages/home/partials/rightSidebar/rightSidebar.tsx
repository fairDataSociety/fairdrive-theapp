import React, { useContext, useState, useEffect } from 'react';

// Hooks
import useStyles from './rightSidebarStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import FileStates from 'src/machines/file/states';
import { FileProviderContext } from 'src/machines/file';

// Components
import PreviewVariant from './variants/preview/preview';
import UploadVariant from './variants/upload/upload';
import { Folder, Close, UploadIcon } from 'src/components/icons/icons';

// Helpers
import { isValueInEnum } from 'src/helpers';

// Types
import { IFile } from 'src/types/models/File';
import GenerateLink from 'src/components/modals/generateLink/generateLink';
import { Modal } from '@material-ui/core';

export enum RIGHT_SIDEBAR_VARIANTS {
  UPLOAD = 'upload',
  PREVIEW_FILE = 'preview_file',
}

export interface Props {
  onClose: () => void;
  file?: IFile;
  variant: RIGHT_SIDEBAR_VARIANTS;
}

function RightSidebar(props: Props) {
  const { FileMachineStore, FileMachineActions } =
    useContext(FileProviderContext);

  const getCurrentPodName = () => FileMachineStore.context.currentPodName;

  const getCurrentDirectoryName = () =>
    FileMachineStore.context.currentDirectory;

  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // Handle sharing content
  const [showSharePodPopup, setShowSharePodPopup] = useState(false);
  const [refLink, setRefLink] = useState(null);

  // Validate variant
  useEffect(() => {
    isValueInEnum(props.variant, RIGHT_SIDEBAR_VARIANTS);
  }, [props.variant]);

  // Proxy file context actions calls
  const proxyActions = async (
    type: 'delete' | 'download' | 'upload' | 'share' | 'open',
    payload?: File[]
  ) => {
    switch (type) {
      case 'delete':
        FileMachineActions.onShareFile(props.file.name);
        props.onClose();
        break;
      case 'download':
        FileMachineActions.onDownloadFile(props.file.name);
        break;
      case 'upload':
        FileMachineActions.onUploadFiles(payload);
        break;
      case 'share':
        FileMachineActions.onShareFile(props.file.name);
        break;
      case 'open':
        // TODO: I don't know what should this action do
        console.log('proxy action open');
        break;
      default:
        console.warn(`proxyActions: Unknown action type of ${type}`);
        break;
    }
  };

  useEffect(() => {
    if (FileMachineStore.matches(FileStates.SHARING_SUCCESS)) {
      setRefLink(FileMachineStore.context.sharedFileReference);
    }
  }, [FileMachineStore]);

  const getProperHeadlineForVariant = (
    variant: RIGHT_SIDEBAR_VARIANTS
  ): string => {
    switch (variant) {
      case RIGHT_SIDEBAR_VARIANTS.UPLOAD:
        return 'Upload Files';
      case RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE:
        return 'Preview File';
      default:
        console.warn(
          `getProperHeadlineForVariant: Unknown variant: ${variant}`
        );
        break;
    }
  };
  useEffect(() => {
    if (refLink !== null) {
      setShowSharePodPopup(true);
    }
  }, [refLink]);

  // Manage opening and closing
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => props.onClose(), 510);
  };

  useEffect(() => {
    if (!isOpen) setIsOpen(true);
  }, [props.file]);

  return (
    <Modal open={props.file !== null} onClose={() => props.onClose()}>
      <div
        className={`${classes.sidebar} ${isOpen ? classes.sidebarOpen : ''}`}
      >
        <div className={classes.headerWrapper}>
          <div className={classes.header}>
            {props.variant === RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE && (
              <Folder />
            )}
            {props.variant === RIGHT_SIDEBAR_VARIANTS.UPLOAD && <UploadIcon />}

            {getProperHeadlineForVariant(props.variant)}
          </div>
          <Close className={classes.icon} onClick={() => closeSidebar()} />
        </div>
        {props.variant === RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE && (
          <PreviewVariant
            podName={getCurrentPodName()}
            directoryName={getCurrentDirectoryName()}
            content={props.file}
            callAction={(type) => proxyActions(type)}
          />
        )}
        {props.variant === RIGHT_SIDEBAR_VARIANTS.UPLOAD && (
          <UploadVariant
            callAction={(type, payload) => proxyActions(type, payload)}
          />
        )}

        {showSharePodPopup && refLink && (
          <GenerateLink
            handleClose={() => setShowSharePodPopup(false)}
            link={refLink}
            variant="share"
            notifyMessage="Share this Pod with a friend via this reference"
          />
        )}
      </div>
    </Modal>
  );
}

export default React.memo(RightSidebar);
