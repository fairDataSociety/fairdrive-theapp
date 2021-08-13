import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { ThemeContext } from '../../store/themeContext/themeContext';

// Store
import { StoreContext } from '../../store/store';
import {
  createDirectory,
  receiveFileInfo,
  sharePod,
} from 'src/store/services/fairOS';

// Components
import { DriveHeader } from './header/driveHeader';
import { DriveModalGroup } from './modalGroup/modalGroup';

import CardGrid from '../../components/cardGrid/cardGrid';
import FileCard from '../../components/cards/fileCard';
import FileModal from '../../components/fileModal/fileModal';

import ButtonNavbar from '../buttonNavbar/buttonNavbar';
import FileList from '../fileList/fileList';

import GenerateLink from '../modals/generateLink/generateLink';

// Hooks and helpers
import useStyles from './driveStyles';
import { sortyByCurrentFilter } from '../../store/helpers/sort';

// Types
import { IFile } from '../../types/models/File';
import { IDirectory } from '../../types/models/Directory';

// Icons
import { Search as SearchIcon } from '../../components/icons/icons';
export interface Props {
  isPodBarOpen: boolean;
}

export type TCurrentFilter =
  | 'least-recent'
  | 'file-type'
  | 'increasing-size'
  | 'decreasing-size'
  | 'ascending-abc'
  | 'descending-abc';

function Drive(props: Props) {
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
  const [isImportFileModalVisible, setIsImportFileModalVisible] =
    useState(false);
  const [isUploadFileModalVisible, setIsUploadFileModalVisible] =
    useState(false);

  // Confirmation of successful creation
  const [responseCreation, setResponseCreation] = useState(false);

  async function loadDirectory() {
    try {
      if (state.podName.length > 0) {
        setFiles(null);
        setFolders(null);
        actions.getDirectory({
          directory: state.directory,
          password: state.password,
          podName: state.podName,
        });
        console.log(state.dirs);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // On depandency change reload data
  useEffect(() => {
    loadDirectory();
    state.fileUploaded = false;
    state.searchQuery = null;
  }, [
    state.fileUploaded,
    state.directory,
    responseCreation,
    state.fileDeleted,
  ]);

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
      {/* Needs to go into buttonNavbar component */}
      {showSharePodPopup && refLink && (
        <GenerateLink
          handleClose={() => setShowSharePodPopup(false)}
          link={refLink}
          variant="share"
          notifyMessage="Share this Pod with a friend via this reference"
        />
      )}
      <div className={classes.navBarWrapper}>
        <ButtonNavbar
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          handleShare={handleShare}
          currentFilter={currentFilter}
          setCurrentFilter={(selectedFilter) =>
            setCurrentFilter(selectedFilter)
          }
        />
      </div>

      {state.podName !== '' && (
        <DriveHeader
          isSearchResults={isSearchQuerySetted()}
          isPrivatePod={state.isPrivatePod}
          onOpenCreateFolderModal={() => setIsCreateFolderModalVisible(true)}
          onOpenImportFileModal={() => setIsImportFileModalVisible(true)}
          onOpenUploadModal={() => setIsUploadFileModalVisible(true)}
        />
      )}

      {isSearchQuerySetted() && (
        <div className={classes.searchDivider}>
          <SearchIcon className={classes.searchIcon} />
          <span>{state.searchQuery}</span>
        </div>
      )}

      {/* TODO: Migrate below props to 3 object props each for individual modal. Less mess. */}
      <DriveModalGroup
        folderName={folderName}
        setFolderName={(newFolderName) => setFolderName(newFolderName)}
        fileName={fileName}
        setFileName={(newFileName) => setFileName(newFileName)}
        onCreateNewFolder={createNewFolder}
        onCreateNewFile={createNewfile}
        isCreateFolderModalVisible={isCreateFolderModalVisible}
        isImportFileModalVisible={isImportFileModalVisible}
        isUploadFileModalVisible={isUploadFileModalVisible}
        onCloseCreateFolderModal={() => setIsCreateFolderModalVisible(false)}
        onCloseImportFileModal={() => setIsImportFileModalVisible(false)}
        onCloseUploadFileModal={() => setIsUploadFileModalVisible(false)}
      />

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
                  />
                )
              )}

            {state.entries &&
              sortyByCurrentFilter(files, currentFilter).map(
                (file: IFile, index) => (
                  <FileModal key={`${file.name}_${index}`} file={file} />
                )
              )}

            {!!state.dirs ||
              !!state.entries ||
              (state.entries === undefined && state.dirs === undefined && (
                <div>Loading files..</div>
              ))}
          </CardGrid>
        ) : (
          <FileList
            currentFilter={currentFilter}
            isPodBarOpen={props.isPodBarOpen}
          ></FileList>
        )
      ) : (
        <p className={classes.noSearchQueryMatches}>
          {isSearchQuerySetted()
            ? 'Sorry, no entries match search query'
            : 'This Pod is empty.'}
        </p>
      )}
    </div>
  );
}

export default React.memo(Drive);
