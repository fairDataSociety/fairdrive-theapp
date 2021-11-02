import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { useModal } from 'src/contexts/modalContext';
import { MODAL_VARIANTS } from 'src/contexts/modalContext/types';
import PodStates from 'src/machines/pod/states';
import { DRIVE_MODES } from 'src/machines/pod/machine';
import { PodProviderContext } from 'src/machines/pod';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { useTheme } from 'src/contexts/themeContext/themeContext';

// Components
import SecondLevelNavigation from './secondLevelNavigation/secondLevelNavigation';
import BaseEmptyState, {
  EMPTY_STATE_VARIANTS,
} from 'src/shared/BaseEmptyState/BaseEmptyState';
import CardEntry from 'src/components/CardEntry/CardEntry';

import TopLevelNavigation from './topLevelNavigation/topLevelNavigation';
import FileList from 'src/components/fileList/fileList';

// Hooks and helpers
import useStyles from './driveStyles';
import { sortyByCurrentFilter } from 'src/helpers/sort';

// Types
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import { OpenRightSidebar } from 'src/pages/home/home';
import { RIGHT_SIDEBAR_VARIANTS } from 'src/pages/home/partials/rightSidebar/rightSidebar';

// Icons
import { Search as SearchIcon } from 'src/components/icons/icons';
export interface Props {
  isPodBarOpen: boolean;
  setRightSidebarContent: (data: OpenRightSidebar) => void;
}

export type TCurrentFilter =
  | 'least-recent'
  | 'file-type'
  | 'increasing-size'
  | 'decreasing-size'
  | 'ascending-abc'
  | 'descending-abc';

function Drive(props: Props) {
  // Matomo
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Pod',
      href: 'https://app.fairdrive.fairdatasociety.org/',
    });
  }, []);

  // Contexts
  const { PodMachineStore, PodMachineActions } = useContext(PodProviderContext);

  const { openModal, closeModal } = useModal();

  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  // Local store of files and directories
  const [files, setFiles] = useState<IFile[] | null>([]);
  const [folders, setFolders] = useState<IDirectory[] | null>([]);

  useEffect(() => {
    const directoryData = PodMachineStore.context.directoryData;

    if (directoryData) {
      if (directoryData.files) {
        setFiles(directoryData.files);
      }
      if (directoryData.dirs) {
        setFolders(directoryData.dirs);
      }
    }
  }, [PodMachineStore]);

  // Toggle grid or list
  const [showGrid, setShowGrid] = useState(true);

  // Handle creating new folder
  const handleCreateDirectoryRequest = (directory): void => {
    PodMachineActions.onCreateDirectory(directory);
    closeModal();
  };

  const openCreateFolderModal = () => {
    openModal({
      type: MODAL_VARIANTS.CREATING,
      data: {
        type: 'Folder',
        onButtonClicked: handleCreateDirectoryRequest,
      },
    });
  };

  // Handle opening directory
  const openClickedDirectory = (directoryName: string): void => {
    setFiles(null);
    setFolders(null);
    PodMachineActions.onOpenDirectory(directoryName);
  };

  // Handle filtering data by search query

  const isSearchQuerySetted = () =>
    PodMachineStore.matches(
      `${PodStates.FETCH_PODS}.${PodStates.FETCH_PODS_SUCCESS}.${PodStates.OPEN_POD}.${PodStates.OPEN_POD_SUCCESS}.${PodStates.DIRECTORY}.${PodStates.DIRECTORY_SUCCESS}.${PodStates.SEARCH_RESULTS}`
    );

  useEffect(() => {
    if (isSearchQuerySetted()) {
      const searchResults = PodMachineStore.context.searchResults;

      if (searchResults.files) {
        setFiles(searchResults.files);
      }

      if (searchResults.dirs) {
        setFolders(searchResults.dirs);
      }
    }
  }, [PodMachineStore]);

  // Handle sharing content

  const handleShare = () => PodMachineActions.onSharePod();

  useEffect(() => {
    const sharedPodReference = PodMachineStore.context.sharedPodReference;
    if (sharedPodReference) {
      openModal({
        type: MODAL_VARIANTS.GENERATE_LINK,
        data: {
          type: 'Share',
          link: sharedPodReference,
        },
      });
    }
  }, [PodMachineStore]);

  // Manage filters
  const [currentFilter, setCurrentFilter] =
    useState<TCurrentFilter>('least-recent');

  const isFilesNotEmpty = () => files && files.length > 0;

  const isFoldersNotEmpty = () => folders && folders.length > 0;

  return (
    <div className={classes.Drive}>
      <div className={classes.navBarWrapper}>
        <TopLevelNavigation
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          handleShare={() => handleShare()}
          currentFilter={currentFilter}
          setCurrentFilter={(selectedFilter) =>
            setCurrentFilter(selectedFilter)
          }
        />
      </div>

      <div className={classes.layoutContent}>
        {PodMachineStore.context.currentlyOpenedPodName && (
          <SecondLevelNavigation
            isSearchResults={isSearchQuerySetted()}
            isOwned={PodMachineStore.context.mode === DRIVE_MODES.PRIVATE}
            onOpenCreateFolderModal={() => openCreateFolderModal()}
            onOpenUploadModal={() =>
              props.setRightSidebarContent({
                variant: RIGHT_SIDEBAR_VARIANTS.UPLOAD,
              })
            }
          />
        )}

        {isSearchQuerySetted() && (
          <div className={classes.searchDivider}>
            <SearchIcon className={classes.searchIcon} />
            <span>{PodMachineStore.context.searchQuery}</span>
          </div>
        )}

        {isFilesNotEmpty() || isFoldersNotEmpty() ? (
          showGrid ? (
            <div className={classes.cardGrid}>
              {folders &&
                sortyByCurrentFilter(folders, currentFilter).map(
                  (dir: IDirectory, index) => (
                    <CardEntry
                      key={`${dir.name}_${index}`}
                      data={dir}
                      isDirectory={true}
                      onDirectoryClick={() => openClickedDirectory(dir.name)}
                    />
                  )
                )}

              {files &&
                sortyByCurrentFilter(files, currentFilter).map(
                  (file: IFile, index) => (
                    <CardEntry
                      key={`${file.name}_${index}`}
                      data={file}
                      isDirectory={false}
                      onFileClick={() =>
                        props.setRightSidebarContent({
                          payload: file,
                          variant: RIGHT_SIDEBAR_VARIANTS.PREVIEW_FILE,
                        })
                      }
                    />
                  )
                )}
            </div>
          ) : (
            <FileList
              currentFilter={currentFilter}
              isPodBarOpen={props.isPodBarOpen}
            />
          )
        ) : (
          <>
            {isSearchQuerySetted() && (
              <p className={classes.noSearchQueryMatches}>
                Sorry, no entries match search query
              </p>
            )}

            {(!isFilesNotEmpty() || !isFoldersNotEmpty()) && (
              <div className={classes.emptyStateWrapper}>
                <BaseEmptyState variant={EMPTY_STATE_VARIANTS.EMPTY_STATE} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Drive);
