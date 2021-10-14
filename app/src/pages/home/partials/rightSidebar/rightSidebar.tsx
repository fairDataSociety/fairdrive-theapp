import React, { useContext, useState, useEffect } from 'react';

// Hooks
import useStyles from './rightSidebarStyles';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';
import FileStates from 'src/machines/file/states';
import { FileProviderContext } from 'src/machines/file';
import { useModal } from 'src/contexts/modalContext';
import { MODAL_VARIANTS } from 'src/contexts/modalContext/types';
// Components
import PreviewVariant from './variants/preview/preview';
import UploadVariant from './variants/upload/upload';
import { Folder, Close, UploadIcon } from 'src/components/icons/icons';
import { Modal } from '@material-ui/core';

// Helpers
import { isValueInEnum } from 'src/helpers';

// Types
import { IFile } from 'src/types/models/File';

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
  // General
  const { FileMachineStore, FileMachineActions } =
    useContext(FileProviderContext);

  const { openModal } = useModal();

  const getCurrentPodName = () => FileMachineStore.context.currentPodName;

  const getCurrentDirectoryName = () =>
    FileMachineStore.context.currentDirectory;

  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

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
        FileMachineActions.onDeleteFile(props.file.name);
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
    const sharedFileReference = FileMachineStore.context.sharedFileReference;

    if (
      FileMachineStore.matches({
        [FileStates.SHARING_NODE]: FileStates.SHARING_SUCCESS,
      }) &&
      sharedFileReference
    ) {
      openModal({
        type: MODAL_VARIANTS.GENERATE_LINK,
        data: {
          type: 'Share',
          link: sharedFileReference,
        },
      });
    }

    if (
      FileMachineStore.matches({
        [FileStates.REMOVING_NODE]: FileStates.REMOVING_SUCCESS,
      })
    ) {
      props.onClose();
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
      </div>
    </Modal>
  );
}

export default React.memo(RightSidebar);
