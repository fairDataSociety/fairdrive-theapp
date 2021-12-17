import React, { useContext, useState, useEffect } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { PodProviderContext } from 'src/machines/pod';
import PodStates from 'src/machines/pod/states';

// Icons
import { PodInfo as PodInfoIcon } from 'src/components/icons/icons';

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
  isOwned: boolean;
  onOpenCreateFolderModal: () => void;
  onOpenImportFileModal: () => void;
  onOpenUploadModal: () => void;
  onOpenUploadCSV: () => void;
}

const SecondLevelNavigation = (props: Props): JSX.Element => {
  const { PodMachineStore } = useContext(PodProviderContext);

  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // Determinate if pod was opened for first time

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(true);

  const STORAGE_DISMISSED_POD_INTROS_KEY = 'dismissed-pod-intros';

  const wasPodIntroDismissed = (): boolean => {
    const savedDismissedPodsIntros = localStorage.getItem(
      STORAGE_DISMISSED_POD_INTROS_KEY
    );
    const parsed: string[] = JSON.parse(savedDismissedPodsIntros);

    return parsed
      ? parsed.includes(PodMachineStore.context.currentlyOpenedPodName)
      : false;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dismissPodIntro = (): void => {
    if (!wasPodIntroDismissed()) {
      const savedDismissedPodsIntros = localStorage.getItem(
        STORAGE_DISMISSED_POD_INTROS_KEY
      );
      const parsed: string[] = JSON.parse(savedDismissedPodsIntros);
      if (parsed !== null) {
        parsed.push(PodMachineStore.context.currentlyOpenedPodName);
        localStorage.setItem(
          STORAGE_DISMISSED_POD_INTROS_KEY,
          JSON.stringify(parsed)
        );
      } else {
        localStorage.setItem(
          STORAGE_DISMISSED_POD_INTROS_KEY,
          JSON.stringify([PodMachineStore.context.currentlyOpenedPodName])
        );
      }
      setIsActionMenuOpen(false);
    }
  };

  const isPodOpenedForFirstTime = (): boolean => {
    const doesPodHasNoDirs = () =>
      PodMachineStore.context.directoryData.dirs &&
      PodMachineStore.context.directoryData.dirs.length === 0;
    const doesPodHasNoEntries = () =>
      PodMachineStore.context.directoryData.files &&
      PodMachineStore.context.directoryData.files.length === 0;

    // I assume that pod intro was dismissed if user closed intro or if pod contains any dir or entry
    return doesPodHasNoEntries() || doesPodHasNoDirs();
  };

  useEffect(() => {
    if (
      PodMachineStore.matches(
        `${PodStates.FETCH_PODS}.${PodStates.FETCH_PODS_SUCCESS}.${PodStates.OPEN_POD}.${PodStates.OPEN_POD_SUCCESS}.${PodStates.DIRECTORY}.${PodStates.DIRECTORY_SUCCESS}`
      )
    ) {
      setIsActionMenuOpen(isPodOpenedForFirstTime());
    }
  }, [PodMachineStore]);

  // Choose messages for current state
  const [informations, setInformations] = useState<{
    title: string;
    caption: string;
  }>({
    title: 'Inventory',
    caption:
      'All your content including what you have shared with others marked with a',
  });

  useEffect(() => {
    if (props.isOwned) {
      if (props.isSearchResults) {
        setInformations({
          title: 'Search',
          caption:
            'All your content including what you have shared with others marked with a',
        });
      } else {
        setInformations({
          title: 'Inventory',
          caption:
            'All your content including what you have shared with others marked with a',
        });
      }
    } else {
      if (props.isSearchResults) {
        setInformations({
          title: 'Search Search file',
          caption:
            '(All links to content shared with you) Links Shared by Username',
        });
      } else {
        setInformations({
          title: 'Inbox (Read Only)',
          caption:
            '(All links to content shared with you) Links Shared by Username',
        });
      }
    }
  }, [props.isOwned, props.isSearchResults]);

  return (
    <>
      <div className={classes.secondLevelNavigation}>
        <div className={classes.left}>
          <div className={classes.titleWrapper}>
            <h1 className={classes.midHeader}>{informations.title}</h1>
          </div>
          <div className={classes.infoWrapper}>
            <PodInfoIcon className={classes.infoIcon} />
            <span className={classes.information}>{informations.caption}</span>
            <div
              className={classes.shareIcon}
              onClick={() => {
                setIsActionMenuOpen(true);
              }}
            >
              s
            </div>
          </div>
        </div>
        {!isActionMenuOpen && (
          <div className={classes.right}>
            <BaseActionButton
              icon={ACTION_BUTTON_ICONS.UPLOAD}
              variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED}
              onClickCallback={() => props.onOpenUploadCSV()}
            >
              CSV
            </BaseActionButton>
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
      {isActionMenuOpen && (
        <ActionMenu
          isOwned={props.isOwned}
          onCreateMarkdownFile={() =>
            window.open('https://app.dracula.fairdatasociety.org', '_blank')
          }
          onCloseActionMenu={() => setIsActionMenuOpen(false)}
          onOpenCreateFolderModal={() => props.onOpenCreateFolderModal()}
          onOpenImportFileModal={() => props.onOpenImportFileModal()}
          onOpenUploadModal={() => props.onOpenUploadModal()}
        />
      )}
      <p className={classes.disclaimer}>
        Note: You cannot share contnet that you do not own
      </p>
    </>
  );
};

export default React.memo(SecondLevelNavigation);
