import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./buttonNavbarStyles";
import urlPath from "src/store/helpers/urlPath";
import { GridIcon, ListIcon, Share } from "../../components/icons/icons";
export interface Props {
  setShowGrid: any;
  showGrid: boolean;
  handleShare: () => Promise<void>;
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
      {/* <div className={classes.headerButton}>
        {" "}
        <Folder className={classes.folder} />
        <PodChevron className={classes.chev} />
      </div> */}
      <div className={classes.header}>{state.podName}</div>
      {/* <Upload onClick={onIconClick} className={classes.Icon}></Upload> */}
      <div className={classes.iconContainerWrapper}>
        {state.podName && (
          <button
            className={classes.iconContainer}
            onClick={() => props.handleShare()}
          >
            <Share className={classes.Icon} />
          </button>
        )}

        <button
          onClick={() => {
            setShowGrid(!showGrid);
          }}
          className={classes.iconContainer}
        >
          {!showGrid ? (
            <GridIcon className={classes.Icon} />
          ) : (
            <ListIcon className={classes.Icon} />
          )}
        </button>
        {/* <div className={classes.iconContainer}>
          <FilterIcon
            onClick={onIconClick}
            className={classes.Icon}
          ></FilterIcon>
        </div> */}
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
