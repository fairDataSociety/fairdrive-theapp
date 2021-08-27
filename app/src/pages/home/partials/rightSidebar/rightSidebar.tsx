import React, { useContext, useEffect, useState } from 'react';

// Hooks
import { useFileContextActions } from 'src/hooks/useFileContextActions';
import useStyles from './rightSidebarStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import Modal from '@material-ui/core/Modal';
import PreviewVariant from './variants/preview/preview';
import UploadVariant from './variants/upload/upload';
import { Folder, Close } from 'src/components/icons/icons';

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

function FileModal(props: Props) {
  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // Validate variant
  useEffect(() => {
    isValueInEnum(props.variant, RIGHT_SIDEBAR_VARIANTS);
  }, [props.variant]);

  // File Context Actions
  const { handleDelete, handleDownload } = useFileContextActions();

  // Proxy file context actions calls
  const proxyFileContextActions = async (type: 'delete' | 'download') => {
    switch (type) {
      case 'delete':
        await handleDelete(props.file.name);
        break;
      case 'download':
        await handleDownload(props.file.name);
        break;
      default:
        console.warn(`proxyFileContextActions: Unknown action type of ${type}`);
        break;
    }
  };

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

  return (
    <Modal
      className={classes.sidebar}
      open={true}
      onClose={() => props.onClose()}
    >
      <>
        <div className={classes.contentWrapper}>
          <div className={classes.headerWrapper}>
            <Folder className={classes.headerIcon} />
            <div className={classes.header}>
              {getProperHeadlineForVariant(props.variant)}
            </div>
            <Close className={classes.icon} onClick={() => props.onClose()} />
          </div>
          <div className={classes.sidebarContent}>
            {props.variant === RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE && (
              <PreviewVariant
                content={props.file}
                callAction={(type) => proxyFileContextActions(type)}
              />
            )}
            {props.variant === RIGHT_SIDEBAR_VARIANTS.UPLOAD && (
              <UploadVariant />
            )}
          </div>
        </div>
      </>
    </Modal>
  );
}

export default React.memo(FileModal);
