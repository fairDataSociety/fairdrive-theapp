import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./downloadStyles";
import Modal from "../modal/modal";

export interface Props {}

export function DownloadFolder(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading='Download Folder' icon={true} button='Download'>
      <p className={classes.label}>Destination</p>
      <input className={classes.input} placeholder='Choose Destination on your local storage'/>
      <p>You are about to download this folder</p>
    </Modal>
  );
}

export function DownloadFile(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Download File' icon={true} button='Download'>
        <p className={classes.label}>Destination</p>
        <input className={classes.input} placeholder='Choose Destination on your local storage'/>
        <p>You are about to download this file</p>
      </Modal>
    );
  }

  export function DownloadAlbum(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Download Album' icon={true} button='Download'>
        <p className={classes.label}>Destination</p>
        <input className={classes.input} placeholder='Choose Destination on your local storage'/>
        <p>You are about to download this album</p>
      </Modal>
    );
  }

  export function DownloadPhoto(props: Props) {
    const { state, actions } = useContext(StoreContext);
    const { theme } = useContext(ThemeContext);
  
    const classes = useStyles({ ...props, ...theme });
  
    return (
      <Modal heading='Download Photo' icon={true} button='Download'>
        <p className={classes.label}>Destination</p>
        <input className={classes.input} placeholder='Choose Destination on your local storage'/>
        <p>You are about to download this photo</p>
      </Modal>
    );
  }

