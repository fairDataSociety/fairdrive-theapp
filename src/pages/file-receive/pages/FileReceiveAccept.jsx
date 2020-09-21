import React from "react";
import styles from "../filereceive.module.css";
import main from "styles.module.css";
import prettyBytes from "pretty-bytes";

export function FileReceiveAccept({
  shareId = "",
  account,
  fileStat,
  nextStage,
  saveFile
}) {
  return (<div className={styles.container}>
    <div className={styles.title}>Fairdrive Receive</div>
    <div className={styles.flexer}></div>
    {
      fileStat
        ? (<div>
          <img alt="" className={styles.appicon}></img>
        </div>)
        : ("")
    }
    {
      fileStat
        ? (<div className={styles.subtitle}>
          <b>{fileStat.name}</b>&nbsp;({prettyBytes(parseInt(fileStat.size))}) will be saved to your Inbox folder.
        </div>)
        : ("")
    }{" "}
    {
      fileStat
        ? (<div>
          {
            account.locked
              ? (<div tabIndex="2" className={main.button} onClick={saveFile}>
                <div>
                  <div className={main.buttontext}>Save</div>
                </div>
              </div>)
              : (<div tabIndex="2" className={main.button}>
                <div>
                  <div className={main.buttontext}>Unlock to allow</div>
                </div>
              </div>)
          }
        </div>)
        : ("")
    }
    <div className={styles.flexer}></div>
    {
      fileStat
        ? (<div>
          {
            account.locked
              ? ("")
              : (<div className={main.link}>Get me out of here</div>)
          }
        </div>)
        : ("")
    }
  </div>);
}
export default FileReceiveAccept;
