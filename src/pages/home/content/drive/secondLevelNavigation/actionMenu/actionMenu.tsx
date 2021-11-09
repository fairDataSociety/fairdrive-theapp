import React, { useContext } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Components
import BaseActionButton, {
  ACTION_BUTTON_VARIANTS,
  ACTION_BUTTON_ICONS,
} from 'src/shared/BaseActionButton/BaseActionButton';

// Icons
import { Close as CloseIcon } from 'src/components/icons/icons';

// Hooks
import useStyles from './actionMenuStyles';

export interface Props {
  isOwned: boolean;
  onCloseActionMenu: () => void;
  onOpenCreateFolderModal: () => void;
  onOpenImportFileModal: () => void;
  onOpenUploadModal: () => void;
  onCreateMarkdownFile: () => void;
}

export const ActionMenu = (props: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const entries = [
    {
      icon: ACTION_BUTTON_ICONS.CREATE,
      label: 'Create',
      action: props.onCreateMarkdownFile,
      caption: 'Create new markdown file in this pod',
      forState: ['Owned'],
    },
    {
      icon: ACTION_BUTTON_ICONS.CREATE,
      label: 'Import',
      action: props.onOpenImportFileModal,
      caption: 'Import file using reference',
      forState: ['Owned', 'Shared'],
    },
    {
      icon: ACTION_BUTTON_ICONS.FOLDER,
      label: 'Create',
      action: props.onOpenCreateFolderModal,
      caption: ' Create new folders in this pod',
      forState: ['Owned', 'Shared'],
    },
    {
      icon: ACTION_BUTTON_ICONS.UPLOAD,
      label: 'Upload',
      action: props.onOpenUploadModal,
      caption: 'Upload Files from your local storage',
      forState: ['Owned', 'Shared'],
    },
  ];

  return (
    <>
      <div className={classes.actionWrapper}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={() => props.onCloseActionMenu()}
        />
        {entries
          .filter((option) =>
            option.forState.includes(props.isOwned ? 'Owned' : 'Shared')
          )
          .map((option, index) => (
            <div key={index} className={classes.actionRow}>
              <BaseActionButton
                icon={option.icon}
                variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED}
                onClickCallback={() => option.action()}
              >
                {option.label}
              </BaseActionButton>
              <span className={classes.actionText}>{option.caption}</span>
            </div>
          ))}
      </div>
    </>
  );
};
