import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import { Redirect, useParams } from "react-router-dom";
import useStyles from "./homeStyles";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import { fileUpload, getDirectory } from "../../store/services/fairOS";
import FileModal from "../../components/fileModal/fileModal";
import sortByProp from "../../store/helpers/sort";
import { Plus, Upload } from "../../components/icons/icons";
import urlPath from "../../store/helpers/urlPath";
import { Modal } from "@material-ui/core";
import NewFolder from "../../components/newFolder/newFolder";

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const params: any = useParams();
  let path = params.path;
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [files, setFiles] = useState(null);
  const [open, setOpen] = useState(false);
  const [folderCreated, setFolderCreated] = useState(false);
  const classes = useStyles({ ...props, ...theme });
  const toSortProp = "name";
  const [toSort, setToSort] = useState(toSortProp);
  const orderProp = "asc";
  const inputFile = useRef(null);
  //Add action to load files
  async function loadDirectory() {
    try {
      const newPath = path.replace(/&/g, "/");
      const res = await getDirectory({
        directory: newPath,
        password: state.password,
      });
      setFiles(res.entries);
      actions.getDirectory({
        directory: newPath,
        password: state.password,
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
  }, [params, state.fileUploaded, folderCreated]);

  useEffect(() => {
    // setFiles(state.entries);
  }, [state.entries]);

  useEffect(() => {
    if (state.searchQuery === "") {
      setFiles(state.entries);
    } else if (state.searchQuery !== null) {
      const filterFiles = state.entries.filter((file) =>
        file.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setFiles(filterFiles);
    }
  }, [state.entries, state.searchQuery]);
  const onIconClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  async function handleFileUpload(files: any) {
    actions.uploadFile({ files, directory: urlPath(path) });
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.Home}>
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
        {!state.password && <Redirect to={"/"} />}
        {files !== null ? (
          files
            .sort(sortByProp(toSort, orderProp))
            .map((file: any) =>
              file.content_type === "inode/directory" ? (
                <FileCard file={file} />
              ) : (
                <FileModal file={file}></FileModal>
              )
            )
        ) : (
          <div>Loading files..</div>
        )}
      </CardGrid>
    </div>
  );
}

export default React.memo(Home);
