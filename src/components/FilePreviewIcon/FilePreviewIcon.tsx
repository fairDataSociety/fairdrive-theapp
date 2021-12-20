import React, { useContext } from 'react';

import classes from './FilePreviewIcon.module.scss';
import File from '@media/fileTypes/File.svg';
import Directory from '@media/fileTypes/Directory.svg';

const FilePreviewIcon = (props: {
  file: any;
  isDirectory?: boolean;
  isQueueItem?: boolean;
  isPreviewSidebar?: boolean;
}) => {
  const ext = props.file.name.split('.').pop();
  const setFileColor = () => {
    return 'dark:text-color-shade-dark-1-night text-color-accents-grey-lavendar';
  };
  const setTextColor = () => {
    return 'dark:text-color-accents-grey-pastel text-color-shade-black-day';
  };
  return (
    <div className={`${classes.iconContainer} ${setFileColor()}`}>
      {props.isDirectory ? (
        <Directory
          className={`${props.isQueueItem && classes.isQueueItem} ${
            props.isPreviewSidebar && classes.isPreviewSidebar
          } ${setFileColor()}`}
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
          } ${setTextColor()}`}
        >
          {ext}
        </div>
      ) : null}
    </div>
  );
};

export default FilePreviewIcon;
