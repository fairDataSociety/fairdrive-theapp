import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getDirectory} from "helpers/apiCalls";
import styles from "./drive.module.css";

// Sub-pages
import FolderView from "./pages/FolderView";

// Ids
const folderViewId = "folderViewId";

function getAccount(state) {
  return state.account;
}

function getSystem(state) {
  return state.system;
}

export function DriveRoot() {
  const params = useParams();
  const path = params.path;
  const account = useSelector(state => getAccount(state));
  const system = useSelector(state => getSystem(state));

  const [contents, setContents] = useState(null);

  const [folderShown, setFolderShown] = useState(false);

  async function getDirectoryContent(path) {
    // replace & with / for the api
    const newPath = path.replace(/&/g, "/");
    const content = await getDirectory(newPath, system.passWord);
    console.log(content);
    setContents(content);
    return content;
  }

  useEffect(() => {
    setContents(null);
    if (folderShown) {
      getDirectoryContent(path).then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }
  }, [folderShown, path]);

  const [stage, setStage] = useState(folderViewId);

  // Router
  switch (stage) {
    case folderViewId:
      return (<FolderView path={path} setFolderShown={setFolderShown} refresh={getDirectoryContent} account={account} contents={contents} nextStage={() => setStage()} exitStage={() => setStage()}></FolderView>);
    default:
      return <h1>Oops...</h1>;
  }
}

export default DriveRoot;
