import React, { useRef, useState } from "react";
import styles from "../../drive.module.css";
import urlPath from "helpers/urlPath";
import rootStyles from "styles.module.css";

import { LinearProgress } from "@material-ui/core";

import { Dialog } from "@material-ui/core";
import { mdiFolderPlus, mdiUpload } from "@mdi/js";
import Icon from "@mdi/react";
import { createDirectory, fileUpload } from "helpers/apiCalls";

export default function NewDialog({ open, path, refresh, onClose }) {
  const homeId = "homeId";
  const newFolderId = "newFolderId";
  const uploadId = "uploadId";
  const uploadingId = "uploadingId";
  const swarmuploadId = "swarmuploadId";
  const errorId = "errorId";

  //const [openNew, setNewOpen] = useState(open);
  const [newDialogContentState, setNewDialogContentState] = useState(homeId);

  const [newFolderName, setNewFolderName] = useState();

  const [uploadProgress, setUploadProgress] = useState(0);

  const hiddenFileInput = useRef(null);

  function handleNewClose() {
    setNewDialogContentState(homeId);
    onClose();
  }

  function handleFolderNameChange(e) {
    setNewFolderName(e.target.value);
  }

  function handleClick(event) {
    hiddenFileInput.current.click();
  }

  function handleChange(event) {
    handleFileUpload(event.target.files);
  }

  function handleSubmit(e) {
    if (e.charCode === 13) {
      handleNewFolder();
    }
  }

  async function handleNewFolder() {
    console.log(newFolderName);
    let writePath = "";
    if (path == "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(path) + "/";
    }
    await createDirectory(writePath + newFolderName);
    //console.log("will create new folder: ", writePath + newFolderName);
    refresh(path);
    handleNewClose();
  }

  async function handleFileUpload(files) {
    setNewDialogContentState(uploadingId);
    await fileUpload(files, urlPath(path), function (progress, total) {
      setUploadProgress(Math.round((progress / total) * 100));
      if (progress == total) {
        setNewDialogContentState(swarmuploadId);
      }
    })
      .then(() => {
        handleNewClose();
        setNewDialogContentState(homeId);
        refresh(path);
      })
      .catch(() => {
        setNewDialogContentState(errorId);
      });

    //dispatch({type: "GET_DRIVE"});
  }

  const NewDialogContent = () => {
    switch (newDialogContentState) {
      case homeId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.menutitle}>
              <div className={styles.close} onClick={handleNewClose}>
                <div className={styles.closeicon} />
              </div>
              <div>New</div>
            </div>
            <div
              className={styles.menuitem}
              onClick={() => setNewDialogContentState(newFolderId)}
            >
              <Icon
                path={mdiFolderPlus}
                className={styles.blue}
                size="24px"
              ></Icon>
              New folder
            </div>
            <div
              className={styles.menuitem}
              onClick={() => setNewDialogContentState(uploadId)}
            >
              <Icon path={mdiUpload} className={styles.blue} size="24px"></Icon>
              Upload files
            </div>
          </div>
        );
        break;
      case newFolderId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleNewClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>New folder</div>
            </div>

            <input
              className={styles.nameInput}
              placeholder="Folder name"
              type="text"
              onKeyPress={(e) => handleSubmit(e)}
              onChange={(e) => handleFolderNameChange(e)}
            ></input>
            <div className={styles.flexer}></div>

            <div onClick={handleNewFolder} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>{">"} create folder</div>
            </div>
          </div>
        );
      case uploadId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleNewClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Upload</div>
            </div>
            <div onClick={handleClick} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>{">"} select files</div>
            </div>
            <input
              multiple="multiple"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{
                display: "none",
              }}
            />
          </div>
        );
        break;
      case uploadingId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleNewClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.uploadSpace} onClick={handleClick}>
              <div className={styles.statusText}>Uploading...</div>
              <LinearProgress
                className={styles.progress}
                variant="determinate"
                value={uploadProgress}
              />
            </div>
          </div>
        );
        break;
      case swarmuploadId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleNewClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.uploadSpace} onClick={handleClick}>
              <div className={styles.statusText}>Storing on Swarm...</div>
              <LinearProgress className={styles.progress} />
            </div>
          </div>
        );
        break;
      case errorId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleNewClose}>
              <div className={styles.closeicon} />
            </div>

            <div className={styles.uploadSpace} onClick={handleClick}>
              <div className={styles.statusText}>Error...</div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
  };
  return (
    <Dialog open={open} fullWidth="fullWidth">
      <div className={styles.dialogContainer}>{NewDialogContent()}</div>
    </Dialog>
  );
}
