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

  const entries = [
    {
      icon: <UploadIcon className={classes.buttonIcon} />,
      label: 'Upload',
      action: props.onOpenUploadModal,
      caption: 'Upload Files from your local storage',
    },
    {
      icon: <ButtonPlus className={classes.buttonIcon} />,
      label: 'Import',
      action: props.onOpenImportFileModal,
      caption: 'Import file using reference',
    },
    {
      icon: <FolderIcon className={classes.buttonIcon} />,
      label: 'Create',
      action: props.onOpenCreateFolderModal,
      caption: ' Create new folders in this pod',
    },
  ];

  return (
    <>
      <div className={classes.actionWrapper}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => props.onCloseActionMenu()}
        />
        {entries.map((option, index) => (
          <div key={index} className={classes.actionRow}>
            <div
              className={classes.actionButton}
              onClick={() => option.action()}
            >
              {option.icon}
              {option.label}
            </div>
            <span className={classes.actionText}>{option.caption}</span>
          </div>
        ))}
      </div>
    </>
  );
};
