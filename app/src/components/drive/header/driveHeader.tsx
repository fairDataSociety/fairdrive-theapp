import React, { useContext, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Icons
import {
  PodInfo as PodInfoIcon,
  ShareIcon,
  UploadIcon,
  ButtonPlus,
  Folder as FolderIcon,
} from 'src/components/icons/icons';

// Hooks
import useStyles from './driveHeaderStyles';

// Components
import { ActionMenu } from './actionMenu/actionMenu';

export interface Props {
  isSearchResults: boolean;
  isPrivatePod: boolean;
  onOpenCreateFolderModal: () => void;
  onOpenImportFileModal: () => void;
  onOpenUploadModal: () => void;
}

export const DriveHeader = (props: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(true);

  return (
    <>
      <div className={classes.midWrapper}>
        <div onClick={() => setIsActionMenuOpen(true)} className={classes.flex}>
          <div className={classes.titleWrapper}>
            <h1 className={classes.midHeader}>
              {props.isSearchResults && 'Search'}
              {props.isPrivatePod && !props.isSearchResults && 'Inventory'}
              {!props.isPrivatePod &&
                !props.isSearchResults &&
                'Inbox (Read Only)'}
            </h1>
          </div>
          <div className={classes.infoWrapper}>
            <PodInfoIcon className={classes.infoIcon} />
            <span className={classes.information}>
              {props.isPrivatePod
                ? 'All your content including what you have shared with others marked with a'
                : '(All links to content shared with you) Links Shared by Username'}
            </span>
            <ShareIcon className={classes.shareIcon} />
          </div>
        </div>
        {!isActionMenuOpen && (
          <div className={classes.actionButtons}>
            <button
              type="button"
              onClick={() => props.onOpenUploadModal()}
              className={classes.buttonWithIcon}
            >
              <UploadIcon className={classes.Icon} />
              <span>Upload</span>
            </button>
            <button
              type="button"
              onClick={() => props.onOpenImportFileModal()}
              className={classes.iconContainer}
            >
              <ButtonPlus className={classes.Icon} />
            </button>
            <button
              type="button"
              onClick={() => props.onOpenCreateFolderModal()}
              className={classes.iconContainer}
            >
              <FolderIcon className={classes.Icon} />
            </button>
          </div>
        )}
      </div>
      {isActionMenuOpen && (
        <ActionMenu
          onCloseActionMenu={() => setIsActionMenuOpen(false)}
          onOpenCreateFolderModal={() => props.onOpenCreateFolderModal()}
          onOpenImportFileModal={() => props.onOpenImportFileModal()}
          onOpenUploadModal={() => {
            props.onOpenUploadModal();
          }}
        />
      )}
    </>
  );
};
