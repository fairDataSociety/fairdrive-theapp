import React, { useEffect, useRef, useState } from "react";
import styles from "../drive.module.css";
import { Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import sortByProp from "../../../helpers/sortByProp";
import urlPath from "../../../helpers/urlPath";
import NewDialog from "./components/NewDialog";
import FolderDialog from "./components/FolderDialog";
import FileDialog from "./components/FileDialog";

import { mdiFolder, mdiSettingsHelper, mdiZipBox } from "@mdi/js";
import Icon from "@mdi/react";

import { AddCircleOutline, LibraryMusic } from "@material-ui/icons/";

import { CircularProgress } from "@material-ui/core";
import defaultAvatar from "images/defaultAvatar.png";

import { createDirectory, deleteDirectory } from "../../../helpers/apiCalls";

export interface Props {
  nextStage?: any;
  exitStage?: any;
  path?: any;
  contents?: any;
  account?: any;
  refresh?: any;
  setFolderShown?: any;
  gotoPreview?: any;
}
export function FolderView(props: Props) {
  const [folderToEdit, setFolderToEdit] = useState("");
  const [openFolder, setFolderOpen] = useState(false);
  const [openNew, setNewOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const [newFolderName, setNewFolderName] = useState("");
  const [filePreviewItem, setFilePreviewItem] = useState("");

  const toSortProp = "name";
  const [toSort, setToSort] = useState(toSortProp);
  const orderProp = "asc";

  const dispatch = useDispatch();
  const history = useHistory();

  function handleFolderClickOpen() {
    setFolderOpen(true);
  }

  function handleFolderClose() {
    setFolderOpen(false);
  }

  function handleNewClickOpen() {
    setNewOpen(true);
  }

  function handleNewClickClose() {
    setNewOpen(false);
  }

  function handleFilePreviewClose() {
    setOpenFile(false);
  }

  useEffect(() => {
    props.setFolderShown(true);
  }, []);

  function handleFolderNameChange(e: any) {
    setNewFolderName(e.target.value);
  }

  function toggleFolderMenuShown(item: any) {
    setFolderToEdit(item);
    handleFolderClickOpen();
  }

  function handleLocation(item: any) {
    console.log(item);
    if (item.content_type == "inode/directory") {
      let writePath = "";
      if (props.path == "root") {
        writePath = "";
      } else {
        writePath = props.path + "&";
      }
      history.push("/drive/" + writePath + item.name);
    } else {
      setFilePreviewItem(item);
      setOpenFile(true);
    }
  }

  function stripLastPath(path: any) {
    return path.split("/").pop();
  }

  function pathToArray(path: any) {
    console.log(urlPath(path).split("/"));
    return urlPath(path).split("/");
  }

  async function handleDeleteFolder(folderName: any) {
    console.log(folderName);
    await deleteDirectory(folderName);
    props.refresh(props.path);
    handleFolderClose();
  }

  function handleGotoAccount() {
    history.push("/account");
  }

  const selectedIcon = (icon: any) => {
    switch (icon) {
      case "inode/directory":
        return <Icon path={mdiFolder}></Icon>;
        break;
      case "application/zip":
        return <Icon path={mdiZipBox}></Icon>;
        break;
      case "mp3":
        return <LibraryMusic></LibraryMusic>;
      default:
        return <img className={styles.fileIcon} src={defaultAvatar}></img>;
        break;
    }
  };

  const Entries = (contents: any) => {
    switch (contents.entries.length) {
      case 0:
        return <div className={styles.folderLoading}>Nothing here yet.</div>;
        break;
      default:
        return contents.entries
          .sort(sortByProp(toSort, orderProp))
          .map((item: any) => (
            <div key={item.name} className={styles.rowItem}>
              <div onClick={() => handleLocation(item.name)}>
                {selectedIcon(item.content_type)}
              </div>
              <div
                onClick={() => handleLocation(item)}
                className={styles.folderText}
              >
                {item.name}
              </div>
              <div onClick={() => toggleFolderMenuShown(item)}>
                <Icon
                  path={mdiSettingsHelper}
                  className={styles.custom}
                  rotate={90}
                  size="36px"
                ></Icon>
              </div>
            </div>
          ));
        break;
    }
  };

  function getPathForItem(item: any, path: any) {
    let patharray = pathToArray(path);
    let index = patharray.indexOf(item);
    patharray = patharray.slice(0, index + 1);
    let urlPath = patharray.join("&");
    return urlPath;
  }

  function breadCrumb(path: any) {
    let patharray = pathToArray(path);
    console.log(patharray);
    patharray = patharray.slice(0, patharray.length - 1);
    return patharray.map((item: any) => (
      <div className={styles.breadcrumbspace}>
        <NavLink
          className={styles.breadcrumbitem}
          to={getPathForItem(item, path)}
        >
          {item + "/"}
        </NavLink>
      </div>
    ));
  }

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.topmenu}>
          <div className={styles.user}>
            <img className={styles.avatar} src={props.account.avatar}></img>
            <div>
              <div
                onClick={() => handleGotoAccount()}
                className={styles.username}
              >
                {props.account.username}
              </div>
              <div className={styles.balance}>
                {props.account.balance}
                &nbsp; BZZ
              </div>
            </div>
          </div>
          <div
            className={styles.addButton}
            onClick={() => handleNewClickOpen()}
          >
            <AddCircleOutline fontSize="large"></AddCircleOutline>
          </div>
        </div>
        <div className={styles.flexer}></div>

        <div>
          <div className={styles.title}>
            {props.path === "root"
              ? "My Fairdrive"
              : stripLastPath(urlPath(props.path))}
          </div>
          {props.path != "root" ? (
            <div className={styles.breadcrumb}>
              <div>Back to: &nbsp;</div>
              <NavLink className={styles.breadcrumbitem} to="/drive/root">
                My Fairdrive/
              </NavLink>
              {breadCrumb(props.path)}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.innercontainer}>
        {props.contents ? (
          Entries(props.contents)
        ) : (
          <div className={styles.folderLoading}>
            <CircularProgress></CircularProgress>
          </div>
        )}
      </div>
      <FolderDialog
        open={openFolder}
        onClose={() => handleFolderClose()}
        path={props.path}
        refresh={props.refresh}
        item={folderToEdit}
      ></FolderDialog>
      <NewDialog
        open={openNew}
        onClose={() => handleNewClickClose()}
        path={props.path}
        refresh={props.refresh}
        item={folderToEdit}
      ></NewDialog>
      <FileDialog
        open={openFile}
        onClose={() => handleFilePreviewClose()}
        path={props.path}
        refresh={props.refresh}
        item={filePreviewItem}
      ></FileDialog>
    </div>
  );
}

export default FolderView;
