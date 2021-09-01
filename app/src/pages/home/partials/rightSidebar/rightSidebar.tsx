import React, { useContext, useState, useEffect } from 'react';

// Hooks
import { useFileContextActions } from 'src/hooks/useFileContextActions';
import useStyles from './rightSidebarStyles';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import PreviewVariant from './variants/preview/preview';
import UploadVariant from './variants/upload/upload';
import { Folder, Close, UploadIcon } from 'src/components/icons/icons';

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
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // Validate variant
  useEffect(() => {
    isValueInEnum(props.variant, RIGHT_SIDEBAR_VARIANTS);
  }, [props.variant]);

  // File Context Actions
  const { handleDelete, handleDownload, handleUpload } =
    useFileContextActions();

  // Proxy file context actions calls
  const proxyFileContextActions = async (
    type: 'delete' | 'download' | 'upload',
    payload?: File[]
  ) => {
    switch (type) {
      case 'delete':
        await handleDelete(props.file.name);
        props.onClose();
        break;
      case 'download':
        await handleDownload(props.file.name);
        break;
      case 'upload':
        await handleUpload(payload);
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
    <div className={`${classes.sidebar} ${isOpen ? classes.sidebarOpen : ''}`}>
      <div className={classes.headerWrapper}>
        <div className={classes.header}>
          {props.variant === RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE && <Folder />}
          {props.variant === RIGHT_SIDEBAR_VARIANTS.UPLOAD && <UploadIcon />}

          {getProperHeadlineForVariant(props.variant)}
        </div>
        <Close className={classes.icon} onClick={() => closeSidebar()} />
      </div>

      {props.variant === RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE && (
        <PreviewVariant
          content={props.file}
          callAction={(type) => proxyFileContextActions(type)}
        />
      )}

      {props.variant === RIGHT_SIDEBAR_VARIANTS.UPLOAD && (
        <UploadVariant
          callAction={(type, payload) => proxyFileContextActions(type, payload)}
        />
      )}
    </div>
  );
}

export default React.memo(RightSidebar);
