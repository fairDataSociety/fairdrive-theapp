import React, { useContext } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './filePreviewStyles';
import { File, Directory } from '../icons/icons';

const FilePreviewFallback = (props: {
  file: any;
  isDirectory?: boolean;
  isQueueItem?: boolean;
  isPreviewSidebar?: boolean;
}) => {
  // General
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });
  const ext = props.file.name.split('.').pop();

  return (
    <div className={`${classes.iconContainer} `}>
      {props.isDirectory ? (
        <Directory
          className={`${props.isQueueItem && classes.isQueueItem} ${
            props.isPreviewSidebar && classes.isPreviewSidebar
          }`}
        />
      ) : (
        <File
          className={`${props.isQueueItem && classes.isQueueItem} ${
            props.isPreviewSidebar && classes.isPreviewSidebar
          }`}
        />
      )}
      {!props.isDirectory ? (
        <div
          className={`
          ${props.isQueueItem && classes.queueMime}
          ${classes.mimeType} ${
            props.isPreviewSidebar && classes.previewMimeType
          }`}
        >
          {ext}
        </div>
      ) : null}
    </div>
  );
};

export default FilePreviewFallback;
