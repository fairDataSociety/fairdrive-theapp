import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./buttonNavbarStyles";
import urlPath from "src/store/helpers/urlPath";
import {
  Folder,
  PodChevron,
  GridIcon,
  ListIcon,
  FilterIcon,
} from "../../components/icons/icons";
export interface Props {
  setShowGrid: any;
  showGrid: boolean;
}

function ButtonNavbar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const inputFile = useRef(null);
  const { showGrid, setShowGrid } = props;

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

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerButton}>
        {" "}
        <Folder className={classes.folder} />
        <PodChevron className={classes.chev} />
      </div>
      <div className={classes.header}>{state.isPrivatePod ? "Private Pod" : "Shared Pod"}</div>
      {/* <Upload onClick={onIconClick} className={classes.Icon}></Upload> */}
      <div className={classes.iconContainerWrapper}>
        <div className={classes.iconContainer}>
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
        <div className={classes.iconContainer}>
          <FilterIcon
            onClick={onIconClick}
            className={classes.Icon}
          ></FilterIcon>
        </div>
      </div>
      <input
        className={classes.uploadInput}
        type="file"
        ref={inputFile}
        onChange={(e) => handleFileUpload(e.target.files)}
      ></input>
    </div>
  );
}

export default React.memo(ButtonNavbar);
