import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./renameStyles";
import Modal from "../modal/modal";

export interface Props {}

export function RenameFolder(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading='Rename Folder' icon={true} button='Save'>
      <p className={classes.label}>Name your folder</p>
      <input className={classes.input} placeholder='File Name'/>
      <p>You are about to rename this folder</p>
    </Modal>
  );
}

export function RenameFile(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Rename File' icon={true} button='Save'>
        <p className={classes.label}>Name your file</p>
        <input className={classes.input} placeholder='File Name'/>
        <p>You are about to rename this file</p>
      </Modal>
    );
  }

  export function RenameAlbum(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Rename Album' icon={true} button='Save'>
        <p className={classes.label}>Name your album</p>
        <input className={classes.input} placeholder='File Name'/>
        <p>You are about to rename this album</p>
      </Modal>
    );
  }

  export function RenamePhoto(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Rename Photo' icon={true} button='Save'>
        <p className={classes.label}>Name your photo</p>
        <input className={classes.input} placeholder='File Name'/>
        <p>You are about to rename this photo</p>
      </Modal>
    );
  }

