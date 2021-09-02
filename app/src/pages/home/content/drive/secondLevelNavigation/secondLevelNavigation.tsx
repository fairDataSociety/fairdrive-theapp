import React, { useContext, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { StoreContext } from 'src/store/store';

// Icons
import {
  PodInfo as PodInfoIcon,
  ShareIcon,
  UploadIcon,
  ButtonPlus,
  Folder as FolderIcon,
} from 'src/components/icons/icons';

// Hooks
import useStyles from './secondLevelNavigationStyles';

// Components
import { ActionMenu } from './actionMenu/actionMenu';
import BaseActionButton, {
  ACTION_BUTTON_VARIANTS,
  ACTION_BUTTON_ICONS,
} from 'src/shared/BaseActionButton/BaseActionButton';

export interface Props {
  isSearchResults: boolean;
  isPrivatePod: boolean;
  onOpenCreateFolderModal: () => void;
  onOpenImportFileModal: () => void;
  onOpenUploadModal: () => void;
}

const SecondLevelNavigation = (props: Props): JSX.Element => {
  const { state } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(true);

  const STORAGE_DISSMISSED_POD_INTROS_KEY = 'dissmissed-pod-intros';

  const wasPodIntroDissmised = (): boolean => {
    const savedDissmissedPodsIntros = localStorage.getItem(
      STORAGE_DISSMISSED_POD_INTROS_KEY
    );
    const parsed: string[] = JSON.parse(savedDissmissedPodsIntros);

    return parsed ? parsed.includes(state.podName) : false;
  };

  const dissmissPodIntro = (): void => {
    if (!wasPodIntroDissmised()) {
      const savedDissmissedPodsIntros = localStorage.getItem(
        STORAGE_DISSMISSED_POD_INTROS_KEY
      );
      const parsed: string[] = JSON.parse(savedDissmissedPodsIntros);
      parsed.push(state.podName);
      localStorage.setItem(
        STORAGE_DISSMISSED_POD_INTROS_KEY,
        JSON.stringify(parsed)
      );
    }
  };

  const isPodOpenedForFirstTime = (): boolean => {
    const hasPodAnyDirsOrEntries = () =>
      (state.entries && state.entries.length === 0) ||
      (state.dirs && state.dirs.length === 0);
    // I assume that pod intro was dissmissed if user closed intro or if pod contains any dir or entry
    return hasPodAnyDirsOrEntries() || wasPodIntroDissmised();
  };

  return (
    <>
      <div className={classes.secondLevelNavigation}>
        <div onClick={() => setIsActionMenuOpen(true)} className={classes.left}>
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
          <div className={classes.right}>
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.UPLOAD}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED}
              onClickCallback={() => props.onOpenUploadModal()}
            >
              Upload
            </BaseActionButton>
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.CREATE}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
              onClickCallback={() => props.onOpenImportFileModal()}
            />
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.FOLDER}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
              onClickCallback={() => props.onOpenCreateFolderModal()}
            />
          </div>
        )}
      </div>
      {isPodOpenedForFirstTime() && (
        <ActionMenu
          onCloseActionMenu={() => dissmissPodIntro()}
          onOpenCreateFolderModal={() => props.onOpenCreateFolderModal()}
          onOpenImportFileModal={() => props.onOpenImportFileModal()}
          onOpenUploadModal={() => {
            props.onOpenUploadModal();
          }}
        />
      )}
      <p className={classes.disclaimer}>
        Note: You cannot share contnet that you do not own
      </p>
    </>
  );
};

export default React.memo(SecondLevelNavigation);
