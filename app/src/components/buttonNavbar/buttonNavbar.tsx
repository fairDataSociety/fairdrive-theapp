import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./buttonNavbarStyles";
import { Modal } from "@material-ui/core";
import urlPath from "src/store/helpers/urlPath";
import {
  Folder,
  PodChevron,
  GridIcon,
  ListIcon,
  FilterIcon,
} from "../../components/icons/icons";
import NewFolder from "../../components/newFolder/newFolder";
export interface Props {
  setFolderCreated: any;
  folderCreated: boolean;
  setShowGrid: any;
  showGrid: boolean;
}

function ButtonNavbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const classes = useStyles({ ...props, ...theme });
  const inputFile = useRef(null);
  const { folderCreated, setFolderCreated, showGrid, setShowGrid } = props;

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
  useEffect(() => {
    if (folderCreated === true) {
      setOpen(false);
    }
  }, [folderCreated]);
  return (
    <div className={classes.buttonNavBar}>
      <div className={classes.headerWrapper}>
        <div className={classes.headerButton}>
          {" "}
          <Folder className={classes.folder} />
          <PodChevron className={classes.chev} />
        </div>
        <div className={classes.header}>Private Pod</div>
        {/* <Upload onClick={onIconClick} className={classes.Icon}></Upload> */}
        <div className={classes.IconContainer}>
          {!showGrid ? (
            <GridIcon
              onClick={() => {
                setShowGrid(true);
              }}
              className={classes.Icon}
            ></GridIcon>
          ) : (
            <ListIcon
              onClick={() => {
                setShowGrid(false);
              }}
              className={classes.Icon}
            ></ListIcon>
          )}
        </div>
        <div className={classes.IconContainer}>
          <FilterIcon
            onClick={onIconClick}
            className={classes.Icon}
          ></FilterIcon>
        </div>
        <input
          className={classes.uploadInput}
          type="file"
          ref={inputFile}
          onChange={(e) => handleFileUpload(e.target.files)}
        ></input>
        {/* <Plus onClick={handleOpen} className={classes.Icon}></Plus> */}
        <Modal
          className={classes.modalContainer}
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <NewFolder setResponse={setFolderCreated} />
        </Modal>
      </div>
    </div>
  );
}

export default React.memo(ButtonNavbar);
