import React, { useContext } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Icons
import {
  UploadIcon,
  ButtonPlus,
  Close as CloseIcon,
  Folder as FolderIcon,
} from 'src/components/icons/icons';

// Hooks
import useStyles from './actionMenuStyles';

export interface Props {
  onCloseActionMenu: () => void;
  onOpenCreateFolderModal: () => void;
  onOpenImportFileModal: () => void;
  onOpenUploadModal: () => void;
}

export const ActionMenu = (props: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...theme });

  return (
    <>
      <div className={classes.actionWrapper}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => props.onCloseActionMenu()}
        />

        <div className={classes.actionRow}>
          <div className={classes.actionButton}>
            <UploadIcon
              className={classes.buttonIcon}
              onClick={() => props.onOpenUploadModal()}
            />
            Upload
          </div>
          <span className={classes.actionText}>
            Upload Files from your local storage
          </span>
        </div>
        <div className={classes.actionRow}>
          <div
            className={classes.actionButton}
            onClick={() => props.onOpenImportFileModal()}
          >
            <ButtonPlus className={classes.buttonIcon} />
            Import
          </div>
          <span className={classes.actionText}>
            Import file using reference
          </span>
        </div>
        <div className={classes.actionRow}>
          <div
            className={classes.actionButton}
            onClick={() => props.onOpenCreateFolderModal()}
          >
            <FolderIcon className={classes.buttonIcon} />
            Create
          </div>
          <span className={classes.actionText}>
            Create new folders in this pod
          </span>
        </div>
      </div>
      <p className={classes.disclaimer}>
        Note: You cannot share contnet that you do not own
      </p>
    </>
  );
};
