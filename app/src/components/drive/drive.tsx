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
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import FileModal from "../../components/fileModal/fileModal";
import UploadModal from '../../components/uploadModal/uploadModal';
import ButtonNavbar from '../buttonNavbar/buttonNavbar';
import FileList from '../fileList/fileList';
import { CreateNew } from '../modals/createNew/createNew';
import GenerateLink from '../modals/generateLink/generateLink';

// Hooks and helpers
import useStyles from './driveStyles';
import { Modal } from '@material-ui/core';
import { sortyByCurrentFilter } from '../../store/helpers/sort';

// Icons
import {
  ButtonPlus,
  PodInfo,
  ShareIcon,
  UploadIcon,
} from '../../components/icons/icons';

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

  const [files, setFiles] = useState<IFile[] | null>([]);
  const [folders, setFolders] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const [open, setOpen] = useState(false);
  const [openImportFile, setOpenImportFile] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [openUpload, setOpenUpload] = useState(false);
  const [responseCreation, setResponseCreation] = useState(false);
  const [showSharePodPopup, setShowSharePodPopup] = useState(false);
  const [refLink, setRefLink] = useState('0000000000000');

  const classes = useStyles({ ...props, ...theme });

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

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseImportFile = () => {
    setOpenImportFile(false);
  };
  const handleOpenImportFile = () => {
    setOpenImportFile(true);
  };
  const handleUploadModal = async (value) => {
    setOpenUpload(value);
  };

  const handleShare = async () => {
    const res = await sharePod(state.password, state.podName);
    setRefLink(res);
    setShowSharePodPopup(true);
  };

  useEffect(() => {
    if (responseCreation === true) {
      setOpen(false);
      setResponseCreation(false);
    }
  }, [responseCreation]);
  const createNewFolder = async () => {
    setResponseCreation(
      await createDirectory(state.directory, folderName, state.podName)
    );
  };
  const createNewfile = async () => {
    setResponseCreation(
      await receiveFileInfo(fileName, state.podName, state.directory)
    );
  };

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
      {state.podName !== '' ? (
        <div className={classes.midWrapper}>
          <div className={classes.midHeader}>
            {state.isPrivatePod ? 'Inventory' : 'Inbox (Read Only)'}
          </div>
          <div className={classes.divider}></div>
          <div className={classes.infoWrapper}>
            <PodInfo className={classes.infoIcon} />
            <div className={classes.information}>
              {state.isPrivatePod
                ? 'All your content including what you have shared with others marked with a'
                : '(All links to content shared with you) Links Shared by Username'}
            </div>
            <ShareIcon className={classes.shareIcon} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {state.podName !== '' ? (
        <div className={classes.actionWrapper}>
          {state.isPrivatePod ? (
            <>
              {' '}
              <div className={classes.actionRow}>
                <div className={classes.actionButton}>
                  <UploadModal
                    open={openUpload}
                    handleUploadModal={handleUploadModal}
                  >
                    <UploadIcon
                      className={classes.buttonIcon}
                      onClick={() => handleUploadModal(true)}
                    />
                    Upload
                  </UploadModal>
                </div>
                <div className={classes.actionText}>
                  Upload Files from your local storage
                </div>
              </div>
              <div className={classes.actionRow}>
                <div
                  className={classes.actionButton}
                  onClick={handleOpenImportFile}
                >
                  <ButtonPlus className={classes.buttonIcon} />
                  Import file
                </div>
                <div className={classes.actionText}>
                  Import file using reference
                </div>
              </div>
              <div className={classes.actionRow}>
                <div className={classes.actionButton} onClick={handleOpen}>
                  <ButtonPlus className={classes.buttonIcon} />
                  Create New Folder
                </div>
                <div className={classes.actionText}>
                  Create new folders in this pod
                </div>
              </div>{' '}
            </>
          ) : (
            <>
              <div className={classes.actionRow}>
                <div className={classes.actionButton} onClick={handleOpen}>
                  <ButtonPlus className={classes.buttonIcon} />
                  Add
                </div>
                <div className={classes.actionText}>Add Files Via Link</div>
              </div>{' '}
            </>
          )}
        </div>
      ) : (
        <div className={classes.actionText}>
          Open one of your pods by clicking on Drive to access files
        </div>
      )}

      <div className={classes.buttonNavBar}></div>

      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={createNewFolder}
          handleClose={handleClose}
          setProp={setFolderName}
          propValue={folderName}
          type="Folder"
        ></CreateNew>
      </Modal>

      <Modal
        className={classes.modalContainer}
        open={openImportFile}
        onClose={handleCloseImportFile}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={createNewfile}
          handleClose={handleCloseImportFile}
          setProp={setFileName}
          propValue={fileName}
          isRefLink={true}
          type="File"
        ></CreateNew>
      </Modal>
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
