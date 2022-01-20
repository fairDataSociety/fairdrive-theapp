/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import prettyBytes from 'pretty-bytes';
import formatDate from '@helpers/formatDate';
import { shortenTitle } from '@helpers/utils';
import classes from './FileCard.module.scss';
import FilePreviewIcon from '@components/FilePreviewIcon/FilePreviewIcon';
type Sizes = 'small' | 'regular' | 'big';
export interface Props {
  size?: Sizes;
  data: any;
  isDirectory: boolean;
  onFileClick?: () => void;
  onDirectoryClick?: () => void;
}

function FileCard({
  data,
  isDirectory,
  size,
  onFileClick,
  onDirectoryClick,
}: Props) {
  // TODO Handle opening directory or file in sidebar
  const handleOnClick = () => {
    if (isDirectory) {
      onDirectoryClick();
    } else {
      onFileClick();
    }
  };

  const getShortedTitle = () => shortenTitle(data.name, 22);

  const getSize = () => prettyBytes(parseInt(data.size));

  const getCreationDate = () => formatDate(data.creation_time, true);

  const isContentTypeDirectory = () => data.content_type === 'inode/directory';

  const getThemeWrapperColor = () => {
    return 'dark:bg-color-shade-dark-4-night border-color-accents-purple-heavy dark:border-color-accents-purple-black dark:shadow-dark-purple shadow-lg text-base dark:text-color-shade-light-1-night text-color-shade-light-1-day cursor-pointer';
  };

  return (
    <div className={`${classes.cardWrapper} ${getThemeWrapperColor()}`}>
      <div className={classes.card} onClick={handleOnClick}>
        <div className={classes.cardHeader}>
          <FilePreviewIcon
            file={data}
            isDirectory={isDirectory}
          ></FilePreviewIcon>
        </div>
        <div className={classes.cardBody}>
          <h2 className={classes.title}>{getShortedTitle()}</h2>
        </div>
      </div>
      <div className={classes.cardFooter}>
        <div>
          {!isContentTypeDirectory() && (
            <>
              <p className={classes.cardFooterEntryTitle}>File Size</p>
              <p className={classes.cardFooterEntryValue}>{getSize()}</p>
            </>
          )}
        </div>
        <div>
          <p className={classes.cardFooterEntryTitle}>Date Added</p>
          <p className={classes.cardFooterEntryValue}>{getCreationDate()}</p>
        </div>
      </div>
    </div>
  );
}
export default React.memo(FileCard);
