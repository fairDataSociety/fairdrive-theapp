import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./buttonNavbarStyles";
import urlPath from "src/store/helpers/urlPath";
import { IUploadFIle } from "../../types/requests/UploadFile";
import { GridIcon, ListIcon, Share, SortingIcon } from "../../components/icons/icons";

import DropDown from "../dropDown/dropDown";
import ClickAwayListener from "react-click-away-listener";

import { TCurrentFilter } from "../drive/drive";

export interface Props {
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  showGrid: boolean;
  handleShare: () => Promise<void>;
  currentFilter: TCurrentFilter;
  setCurrentFilter: (selectedFilter: TCurrentFilter) => void;
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
  async function handleFileUpload(files: FileList) {
    actions.uploadFile({
      files,
      directory: urlPath(state.directory),
      podName: state.podName,
    });
  }

  const [isSortingDropdownVisible, setIsSortingDropdownVisible] =
    useState(false);

  const splitAndUppercaseCurrentFilterName = (
    currentFilter: string
  ): string => {
    const arr = currentFilter.split("-");
    arr.forEach((word, index) => {
      arr[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return arr.join(" ");
  };

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
        <button
          type="button"
          onClick={() => setIsSortingDropdownVisible(true)}
          className={classes.iconContainer}
        >
          <SortingIcon className={classes.Icon}></SortingIcon>
          {isSortingDropdownVisible && (
            <ClickAwayListener
              onClickAway={() => setIsSortingDropdownVisible(false)}
            >
              <div className={classes.dropdown}>
                <DropDown
                  variant="primary"
                  heading="Sort By"
                  subheading={splitAndUppercaseCurrentFilterName(
                    props.currentFilter
                  )}
                >
                  <ul>
                    <li
                      onClick={() => props.setCurrentFilter("least-recent")}
                      className={classes.dropdownItem}
                    >
                      Least recent
                    </li>
                    <li
                      onClick={() => props.setCurrentFilter("file-type")}
                      className={classes.dropdownItem}
                    >
                      File Type
                    </li>
                    <li
                      onClick={() => props.setCurrentFilter("increasing-size")}
                      className={classes.dropdownItem}
                    >
                      Increasing Size
                    </li>
                    <li
                      onClick={() => props.setCurrentFilter("decreasing-size")}
                      className={classes.dropdownItem}
                    >
                      Decreasing Size
                    </li>
                    <li
                      onClick={() => props.setCurrentFilter("ascending-abc")}
                      className={classes.dropdownItem}
                    >
                      Ascending ABC
                    </li>
                    <li
                      onClick={() => props.setCurrentFilter("descending-abc")}
                      className={classes.dropdownItem}
                    >
                      Descending ABC
                    </li>
                  </ul>
                </DropDown>
              </div>
            </ClickAwayListener>
          )}
        </button>
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
