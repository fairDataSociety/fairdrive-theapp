import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import { Redirect, useParams, useHistory } from "react-router-dom";
import useStyles from "./homeStyles";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import { fileUpload, getDirectory } from "../../store/services/fairOS";
import FileModal from "../../components/fileModal/fileModal";
import sortByProp from "../../store/helpers/sort";
import { Upload } from "../../components/icons/icons";
import urlPath from "../../store/helpers/urlPath";

export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const params: any = useParams();
  const path = params.path;
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [files, setFiles] = useState(null);
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
      actions.getDirectory({
        directory: newPath,
        password: state.password,
      });
      setFiles(res.entries);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadDirectory();
    state.fileUploaded = false;
  }, [params, state.fileUploaded]);

  useEffect(() => {
    setFiles(state.entries);
  }, [state.entries]);

  useEffect(() => {
    if (state.searchQuery === null || state.searchQuery === "") {
      setFiles(state.entries);
    } else {
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
    actions.uploadFile({ files, directory: urlPath(path) });
  }
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
      </div>
      <CardGrid>
        {!state.password && <Redirect to={"/"} />}
        {files !== null &&
          files
            .sort(sortByProp(toSort, orderProp))
            .map((file) =>
              file.content_type === "inode/directory" ? (
                <FileCard file={file} />
              ) : (
                <FileModal file={file}></FileModal>
              )
            )}
      </CardGrid>
    </div>
  );
}

export default React.memo(Home);
