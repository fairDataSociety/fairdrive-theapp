import React, { useEffect, useRef, useState } from "react";
import styles from "../../drive.module.css";
import rootStyles from "styles.module.css";
import urlPath from "../../../../helpers/urlPath";

import { Dialog } from "@material-ui/core";
import { mdiShare, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import {
  deleteDirectory,
  deleteFile,
  shareFile,
} from "../../../../helpers/apiCalls";

export interface Props {
  open: any;
  path: any;
  refresh: any;
  onClose: any;
  item: any;
}

function FolderDialog(props: Props) {
  console.log("from newdialog: ", props.open, props.path);

  const homeId = "homeId";
  const shareId = "shareId";
  const renameId = "renameId";
  const deleteId = "deleteId";
  const errorId = "errorId";
  const showShareId = "showShareId";

  const shareHost = process.env.REACT_APP_FAIRDRIVEHOST;

  const [folderContentState, setFolderContentState] = useState(homeId);
  const [newFolderName, setNewFolderName] = useState();
  const [shareName, setShareName] = useState();
  const [shareLink, setShareLink] = useState();

  const [newName, setNewName] = useState();

  useEffect(() => {
    setNewFolderName(props.item.name);
    console.log(props.item);
  }, [props.item]);

  function handleFolderClose() {
    setFolderContentState(homeId);
    props.onClose();
  }

  function handleFolderNameChange(e: any) {
    setNewFolderName(e.target.value);
  }

  function handleShareChange(e: any) {
    setShareName(e.target.value);
  }

  async function handleRename() {
    props.refresh(props.path);
    handleFolderClose();
  }

  async function handleDelete() {
    // what is it?
    let writePath = "";
    if (props.path == "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(props.path) + "/";
    }

    if (props.item.content_type == "inode/directory") {
      await deleteDirectory(writePath + props.item.name);
    } else {
      await deleteFile(writePath + props.item.name);
    }
    //await deleteFile
    props.refresh(props.path);
    handleFolderClose();
  }

  async function handleShare() {
    let writePath = "";
    if (props.path == "root") {
      writePath = "/";
    } else {
      writePath = "/" + urlPath(props.path) + "/";
    }
    const res = await shareFile(writePath + props.item.name);
    console.log(res);
    setShareLink(res);
    setFolderContentState(showShareId);
    selectText();
    //handleFolderClose();
  }

  function selectText() {
    /* Get the text field */
    var copyText = document.getElementById("link");

    /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    //alert("Copied the text: " + copyText.value);
  }

  const FolderDialogContent = () => {
    switch (folderContentState) {
      case homeId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Action: {props.item.name}</div>
            </div>
            {props.item.content_type != "inode/directory" ? (
              <div className={styles.menuitem} onClick={handleShare}>
                <Icon
                  path={mdiShare}
                  className={styles.blue}
                  size="24px"
                ></Icon>
                Share
              </div>
            ) : (
              ""
            )}

            {/* <div className={styles.menuitem} onClick={() => setFolderContentState(renameId)}>
            <Icon path={mdiUpload} className={styles.blue} size="24px"></Icon>
            Rename
          </div> */}
            <div
              className={styles.menuitem}
              onClick={() => setFolderContentState(deleteId)}
            >
              <Icon
                path={mdiTrashCan}
                className={styles.blue}
                size="24px"
              ></Icon>
              Delete
            </div>
          </div>
        );
        break;
      case shareId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Share</div>
            </div>

            <input
              className={styles.nameInput}
              placeholder="Friend's name"
              type="text"
              onChange={(e) => handleShareChange(e)}
            ></input>
            <div className={styles.flexer}>
              <div onClick={handleShare} className={styles.buttonPlace}>
                <div className={rootStyles.buttontext}>{">"} share</div>
              </div>
            </div>
          </div>
        );
        break;
      case renameId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Rename folder</div>
            </div>

            <input
              className={styles.nameInput}
              value={newFolderName}
              type="text"
              onChange={(e) => handleFolderNameChange(e)}
            ></input>
            <div className={styles.flexer}></div>

            <div onClick={handleRename} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>{">"} rename folder</div>
            </div>
          </div>
        );
      case deleteId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Delete {props.item.name}?</div>
            </div>

            <div onClick={handleDelete} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>
                {">"} remove permanently
              </div>
            </div>
          </div>
        );
        break;
      case showShareId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>
            <div className={styles.menutitle}>
              <div>Share this link</div>
            </div>
            <div className={styles.shareLinkPlace}>
              <input
                type="text"
                value={`https://app.fairdrive.io/#/receive/` + shareLink}
                className={styles.nameInput}
                id="link"
              ></input>
            </div>
            <div className={styles.shareLink}>Link copied to clipboard!</div>
            <div onClick={handleFolderClose} className={styles.buttonPlace}>
              <div className={rootStyles.buttontext}>{">"} close</div>
            </div>
          </div>
        );

      case errorId:
        return (
          <div className={styles.foldermenu}>
            <div className={styles.close} onClick={handleFolderClose}>
              <div className={styles.closeicon} />
            </div>

            <div className={styles.uploadSpace}>
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
    <Dialog open={props.open} fullWidth={true}>
      <div className={styles.dialogContainer}>{FolderDialogContent()}</div>
    </Dialog>
  );
}
export default React.memo(FolderDialog);
