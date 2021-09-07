import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { usePodStateMachine } from 'src/contexts/podStateMachine';

// Store
import { StoreContext } from 'src/store/store';
import { receiveFileInfo } from 'src/services/file';

import { sharePod } from 'src/services/pod';

import { createDirectory } from 'src/services/directory';

// Components
import SecondLevelNavigation from './secondLevelNavigation/secondLevelNavigation';
import { DriveModalGroup } from './modalGroup/modalGroup';
import BaseEmptyState, {
  EMPTY_STATE_VARIANTS,
} from 'src/shared/BaseEmptyState/BaseEmptyState';
import CardGrid from 'src/components/cardGrid/cardGrid';
import FileCard from 'src/components/cards/fileCard';

import TopLevelNavigation from './topLevelNavigation/topLevelNavigation';
import FileList from 'src/components/fileList/fileList';

// Hooks and helpers
import useStyles from './driveStyles';
import { sortyByCurrentFilter } from 'src/helpers/sort';
import { usePodContextActions } from 'src/hooks/usePodContextActions';
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
  // Contexts
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  // Local store of files and directories
  const [files, setFiles] = useState<IFile[] | null>([]);
  const [folders, setFolders] = useState<IDirectory[] | null>([]);

  useEffect(() => {
    setFiles(state.entries);
    setFolders(state.dirs);
  }, [state.entries, state.dirs]);

  // Toggle grid or list
  const [showGrid, setShowGrid] = useState(true);

  // Manage state of modals
  const [isCreateFolderModalVisible, setIsCreateFolderModalVisible] =
    useState(false);
  const [isCreateFileModalVisible, setIsCreateFileModalVisible] =
    useState(false);

  // Confirmation of successful creation
  const [responseCreation, setResponseCreation] = useState(false);

  const { handleOpenDirectory } = usePodContextActions();

  async function loadDirectory(directoryName: string) {
    try {
      if (state.podName.length > 0) {
        setFiles(null);
        setFolders(null);
        handleOpenDirectory(directoryName);
        state.isFileUploaded = false;
        state.searchQuery = null;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // On depandency change reload data

  // TODO: Remove below

  // useEffect(() => {
  //   if (
  //     podStateMachine.tag === STATES_NAMES.DIRECTORY_STATE &&
  //     podStateMachine.directoryName !== 'root'
  //   ) {
  //     loadDirectory();

  //   }
  // }, [
  //   state.isFileUploaded,
  //   state.directory,
  //   responseCreation,
  //   state.fileDeleted,
  // ]);

  const onDirectoryClick = (directoryName: string): void => {
    actions.setDirectory(directoryName);
    console.log('open dir: ', directoryName);
    loadDirectory(directoryName);
  };

  // Handle filtering data by search query
  useEffect(() => {
    if (state.entries) {
      setFiles(state.entries);
    }
    if (state.dirs) {
      setFolders(state.dirs);
    }

    if (state.searchQuery !== null) {
      if (state.entries) {
        const filterFiles = state.entries.filter((file) =>
          file.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        setFiles(filterFiles);
      }
      if (state.dirs) {
        const filterFolders = state.dirs.filter((dir) =>
          dir.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        setFolders(filterFolders);
      }
    }
  }, [state.searchQuery]);

  // Handle sharing content
  const [showSharePodPopup, setShowSharePodPopup] = useState(false);
  const [refLink, setRefLink] = useState('0000000000000');

  const handleShare = async () => {
    const res = await sharePod(state.password, state.podName);
    setRefLink(res);
    setShowSharePodPopup(true);
  };

  useEffect(() => {
    if (responseCreation === true) {
      setIsCreateFolderModalVisible(false);
      setResponseCreation(false);
    }
  }, [responseCreation]);

  // Handle creating folder
  const [folderName, setFolderName] = useState('');

  const createNewFolder = async () => {
    setResponseCreation(
      await createDirectory(state.directory, folderName, state.podName)
    );
  };

  // Handle creating file
  const [fileName, setFileName] = useState('');

  const createNewfile = async () => {
    setResponseCreation(
      await receiveFileInfo(fileName, state.podName, state.directory)
    );
  };

  // Manage filters
  const [currentFilter, setCurrentFilter] =
    useState<TCurrentFilter>('least-recent');

  const isSearchQuerySetted = () =>
    state.searchQuery && state.searchQuery !== '';

  const isFilesNotEmpty = () => files && files.length > 0;

  const isFoldersNotEmpty = () => folders && folders.length > 0;

  return (
    <div className={classes.Drive}>
      <div className={classes.navBarWrapper}>
        <TopLevelNavigation
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          handleShare={handleShare}
          currentFilter={currentFilter}
          setCurrentFilter={(selectedFilter) =>
            setCurrentFilter(selectedFilter)
          }
        />
      </div>

      <div className={classes.layoutContent}>
        {state.podName !== '' && (
          <SecondLevelNavigation
            isSearchResults={isSearchQuerySetted()}
            isOwned={state.isPrivatePod}
            onOpenCreateFolderModal={() => setIsCreateFolderModalVisible(true)}
            onOpenImportFileModal={() => setIsCreateFileModalVisible(true)}
            onOpenUploadModal={() =>
              props.setRightSidebarContent({
                variant: RIGHT_SIDEBAR_VARIANTS.UPLOAD,
              })
            }
          />
        )}

        <DriveModalGroup
          folderName={folderName}
          setFolderName={(newFolderName) => setFolderName(newFolderName)}
          fileName={fileName}
          setFileName={(newFileName) => setFileName(newFileName)}
          createFolderModal={{
            isCreateFolderModalVisible: () => isCreateFolderModalVisible,
            onCreate: () => createNewFolder(),
            onClose: () => setIsCreateFolderModalVisible(false),
          }}
          createFileModal={{
            isCreateFileModalVisible: () => isCreateFileModalVisible,
            onCreate: () => createNewfile(),
            onClose: () => setIsCreateFileModalVisible(false),
          }}
          sharePodModal={{
            isSharePodModalVisible: () => showSharePodPopup,
            refLink: () => refLink,
            onClose: () => setShowSharePodPopup(false),
          }}
        />

        {isSearchQuerySetted() && (
          <div className={classes.searchDivider}>
            <SearchIcon className={classes.searchIcon} />
            <span>{state.searchQuery}</span>
          </div>
        )}

        {isFilesNotEmpty() || isFoldersNotEmpty() ? (
          showGrid ? (
            <CardGrid className={classes.cardGrid}>
              {state.dirs &&
                sortyByCurrentFilter(folders, currentFilter).map(
                  (dir: IDirectory, index) => (
                    <FileCard
                      key={`${dir.name}_${index}`}
                      file={dir}
                      isDirectory={true}
                      onDirectoryClick={() => onDirectoryClick(dir.name)}
                    />
                  )
                )}

              {state.entries &&
                sortyByCurrentFilter(files, currentFilter).map(
                  (file: IFile, index) => (
                    <FileCard
                      key={`${file.name}_${index}`}
                      file={file}
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
            </CardGrid>
          ) : (
            <FileList
              currentFilter={currentFilter}
              isPodBarOpen={props.isPodBarOpen}
            ></FileList>
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
