import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./createNewStyles";
import Modal from "../modal/modal";

export interface Props {}

export function CreateNewFolder(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading='Create New Folder' icon={true} button='Create'>
      <p className={classes.label}>Name your folder</p>
      <input className={classes.input} placeholder='Folder Name'/>
      <p>You are about to create a new folder</p>
    </Modal>
  );
}

export function CreateNewFile(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Create New File' icon={true} button='Create'>
        <p className={classes.label}>Name your file</p>
        <input className={classes.input} placeholder='File Name'/>
        <p>You are about to create a new file</p>
      </Modal>
    );
  }

  export function CreateNewAlbum(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Create New Album' icon={true} button='Create'>
        <p className={classes.label}>Name your album</p>
        <input className={classes.input} placeholder='Album Name'/>
        <p>You are about to create a new album</p>
      </Modal>
    );
  }

