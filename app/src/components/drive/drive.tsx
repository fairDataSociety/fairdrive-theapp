import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./driveStyles";
import { Modal } from "@material-ui/core";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import FileModal from "../../components/fileModal/fileModal";
import sortByProp from "../../store/helpers/sort";
import { Plus, Upload } from "../../components/icons/icons";
import urlPath from "../../store/helpers/urlPath";
import NewFolder from "../../components/newFolder/newFolder";

export interface Props {
  isPodBarOpen: boolean
}

function BoilerPlate(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [folderCreated, setFolderCreated] = useState(false);
  const toSortProp = "name";
  const [toSort, setToSort] = useState(toSortProp);
  const orderProp = "asc";
  const inputFile = useRef(null);

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
    if (folderCreated === true) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [state.fileUploaded, folderCreated, state.directory]);

  useEffect(() => {
    if (state.entries !== null) setFiles(state.entries);
  }, [state.entries]);

  useEffect(() => {
    if (state.searchQuery === "" && files.length !== state.entries.length) {
      setFiles(state.entries);
    } else if (state.searchQuery !== null) {
      const filterFiles = state.entries.filter((file) =>
        file.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setFiles(filterFiles);
    }
  }, [state.searchQuery]);
  const onIconClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  async function handleFileUpload(files: any) {
    actions.uploadFile({
      files,
      directory: urlPath(state.directory),
      podName: state.podName,
    });
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.BoilerPlate}>
      {/* Needs to go into buttonNavbar component */}
      <div className={classes.buttonNavBar}>
        <Upload onClick={onIconClick} className={classes.Icon}></Upload>
        <input
          className={classes.uploadInput}
          type="file"
          ref={inputFile}
          onChange={(e) => handleFileUpload(e.target.files)}
        ></input>
        <Plus onClick={handleOpen} className={classes.Icon}></Plus>
      </div>
      <div className={classes.buttonNavBar}></div>
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NewFolder setResponse={setFolderCreated} />
      </Modal>
      <CardGrid className={classes.cardGrid}>
        {state.dirs !== null &&
          state.dirs !== undefined &&
          state.dirs.map((dir: any) => <FileCard file={dir}></FileCard>)}
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
    </div>
  );
}

export default React.memo(BoilerPlate);
