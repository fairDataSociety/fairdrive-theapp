import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./driveStyles";
import { Modal } from "@material-ui/core";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import FileModal from "../../components/fileModal/fileModal";
import UploadModal from "../../components/uploadModal/uploadModal";
import sortByProp from "../../store/helpers/sort";
import OpenInDapp from "../modals/openInDapp/openInDapp";
import ButtonNavbar from "../buttonNavbar/buttonNavbar";
import FileList from "../fileList/fileList";
import {
  ButtonPlus,
  PodInfo,
  ShareIcon,
  UploadIcon,
} from "../../components/icons/icons";
import { CreateNew } from "../modals/createNew/createNew";
import { createDirectory } from "src/store/services/fairOS";

export interface Props {
  isPodBarOpen: boolean;
}

function Drive(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const [files, setFiles] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDappModal, setOpenDappModal] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [responseCreation, setResponseCreation] = useState(false);
  const toSortProp = "name";
  // eslint-disable-next-line
  const [toSort, setToSort] = useState(toSortProp);
  const orderProp = "asc";

  const classes = useStyles({ ...props, ...theme });

  async function loadDirectory() {
    try {
      setFiles(null);
      actions.getDirectory({
        directory: state.directory,
        password: state.password,
        podName: state.podName,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadDirectory();
    state.fileUploaded = false;
    state.searchQuery = null;

    // eslint-disable-next-line
  }, [state.fileUploaded, state.directory, responseCreation]);

  useEffect(() => {
    if (state.entries !== null) setFiles(state.entries);
    // eslint-disable-next-line
  }, [state.entries]);

  useEffect(() => {
    if (files !== undefined && files !== null)
      if (state.searchQuery === "" && files?.length !== state.entries?.length) {
        setFiles(state.entries);
      } else if (state.searchQuery !== null) {
        const filterFiles = state.entries.filter((file) =>
          file.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        setFiles(filterFiles);
      }
    // eslint-disable-next-line
  }, [state.searchQuery]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseDappModal = () => {
    setOpenDappModal(false);
  };
  const handleOpenDappModal = () => {
    setOpenDappModal(true);
  };
  const handleUploadModal = async (value) => {
    setOpenUpload(value);
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

  return (
    <div className={classes.Drive}>
      {/* Needs to go into buttonNavbar component */}
      <div className={classes.navBarWrapper}>
        <ButtonNavbar
          showGrid={showGrid}
          setShowGrid={setShowGrid}
        ></ButtonNavbar>
      </div>
      {state.podName !== "" ? (
        <div className={classes.midWrapper}>
          <div className={classes.midHeader}>
            {state.isPrivatePod ? "Inventory" : "Inbox (Read Only)"}
          </div>
          <div className={classes.divider}></div>
          <div className={classes.infoWrapper}>
            <PodInfo className={classes.infoIcon} />
            <div className={classes.information}>
              {state.isPrivatePod
                ? "All your content including what you have shared with others marked with a"
                : "(All links to content shared with you) Links Shared by Username"}
            </div>
            <ShareIcon className={classes.shareIcon} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {state.podName !== "" ? (
        <div className={classes.actionWrapper}>
          {state.isPrivatePod ? (
            <>
              {" "}
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
              {/* <div className={classes.actionRow}>
              <div
                className={classes.actionButton}
                onClick={handleOpenDappModal}
              >
                <ButtonPlus className={classes.buttonIcon} />
                Create New File
              </div>
              <div className={classes.actionText}>
                Create new files with markdown editor: Fairtext
              </div>
            </div> */}
              <div className={classes.actionRow}>
                <div className={classes.actionButton} onClick={handleOpen}>
                  <ButtonPlus className={classes.buttonIcon} />
                  Create New Folder
                </div>
                <div className={classes.actionText}>
                  Create new folders in this pod
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              <div className={classes.actionRow}>
                <div className={classes.actionButton} onClick={handleOpen}>
                  <ButtonPlus className={classes.buttonIcon} />
                  Add
                </div>
                <div className={classes.actionText}>Add Files Via Link</div>
              </div>{" "}
            </>
          )}
        </div>
      ) : (
        <div className={classes.actionText}>
          Open one of your pods to access files
        </div>
      )}

      <div className={classes.buttonNavBar}></div>
      {/* <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NewFolder setResponse={setFolderCreated} />
      </Modal> */}
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
          type="Folder"
        ></CreateNew>
      </Modal>

      <Modal
        className={classes.modalContainer}
        open={openDappModal}
        onClose={handleCloseDappModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <OpenInDapp
          handleClose={handleCloseDappModal}
          dapp="Markdown Editor"
        ></OpenInDapp>
      </Modal>

      {showGrid ? (
        <CardGrid className={classes.cardGrid}>
          {state.dirs !== null &&
            state.dirs !== undefined &&
            state.dirs.map((dir: any) => (
              <FileCard file={dir} isDirectory={true}></FileCard>
            ))}
          {files !== null &&
            files !== undefined &&
            files
              .sort(sortByProp(toSort, orderProp))
              .map((file: any) => <FileModal file={file}></FileModal>)}
          {state.dirs === null ||
            state.dirs === undefined ||
            files === null ||
            (files === undefined && <div>Loading files..</div>)}
        </CardGrid>
      ) : (
        <FileList isPodBarOpen={props.isPodBarOpen}></FileList>
      )}
    </div>
  );
}

export default React.memo(Drive);
