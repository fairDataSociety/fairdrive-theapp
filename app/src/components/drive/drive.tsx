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

  const [files, setFiles] = useState<IFile[] | null>([]);
  const [folders, setFolders] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  // Manage state of modals
  const [isCreateFolderModalVisible, setIsCreateFolderModalVisible] =
    useState(false);
  const [isImportFileModalVisible, setIsImportFileModalVisible] =
    useState(false);
  const [isUploadFileModalVisible, setIsUploadFileModalVisible] =
    useState(false);

  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');

  const [responseCreation, setResponseCreation] = useState(false);
  const [showSharePodPopup, setShowSharePodPopup] = useState(false);
  const [refLink, setRefLink] = useState('0000000000000');

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

  useEffect(() => {
    loadDirectory();
    state.fileUploaded = false;
    state.searchQuery = null;
    // eslint-disable-next-line
  }, [
    state.fileUploaded,
    state.directory,
    responseCreation,
    state.fileDeleted,
  ]);

  useEffect(() => {
    setFiles(state.entries);
    setFolders(state.dirs);
    // eslint-disable-next-line
  }, [state.entries, state.dirs]);

  useEffect(() => {
    if (
      files !== undefined &&
      files !== null &&
      folders !== undefined &&
      folders !== null
    )
      if (state.searchQuery === '' && files?.length !== state.entries?.length) {
        setFiles(state.entries);
      }
    if (state.searchQuery === '' && folders?.length !== state.dirs?.length) {
      setFolders(state.dirs);
    }
    if (state.searchQuery !== null) {
      const filterFiles = state.entries.filter((file) =>
        file.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setFiles(filterFiles);
      const filterFolders = state.dirs.filter((dir) =>
        dir.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setFolders(filterFolders);
    }
    // eslint-disable-next-line
  }, [state.searchQuery]);

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
  const createNewFolder = async () => {
    setResponseCreation(
      await createDirectory(state.directory, folderName, state.podName)
    );
  };

  // Handle creating file
  const createNewfile = async () => {
    setResponseCreation(
      await receiveFileInfo(fileName, state.podName, state.directory)
    );
  };

  // Manage filters
  const [currentFilter, setCurrentFilter] =
    useState<TCurrentFilter>('least-recent');

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
          isPrivatePod={state.isPrivatePod}
          onOpenCreateFolderModal={() => setIsCreateFolderModalVisible(true)}
          onOpenImportFileModal={() => setIsImportFileModalVisible(true)}
          onOpenUploadModal={() => setIsUploadFileModalVisible(true)}
        />
      )}

      <div className={classes.buttonNavBar}></div>

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

      {showGrid ? (
        <CardGrid className={classes.cardGrid}>
          {state.dirs !== null &&
            state.dirs !== undefined &&
            sortyByCurrentFilter(folders, currentFilter).map((dir: any) => {
              return (
                <FileCard key={dir} file={dir} isDirectory={true}></FileCard>
              );
            })}
          {state.entries !== null &&
            state.entries !== undefined &&
            sortyByCurrentFilter(files, currentFilter).map((file: any) => {
              return <FileModal key={file.name} file={file}></FileModal>;
            })}
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
      )}
    </div>
  );
}

export default React.memo(Drive);
