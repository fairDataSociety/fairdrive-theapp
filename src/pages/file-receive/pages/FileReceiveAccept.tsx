import React from "react";
import styles from "../filereceive.module.css";
import main from "styles.module.css";
import prettyBytes from "pretty-bytes";

export interface Props {
  shareId: any;
  account: any;
  fileStat: any;
  nextStage?: any;
  saveFile?: any;
}
function FileReceiveAccept(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Fairdrive Receive</div>
      <div className={styles.flexer}></div>
      {props.fileStat ? (
        <div>
          <img alt="" className={styles.appicon}></img>
        </div>
      ) : (
        ""
      )}
      {props.fileStat ? (
        <div className={styles.subtitle}>
          <b>{props.fileStat.name}</b>&nbsp;(
          {prettyBytes(parseInt(props.fileStat.size))}) will be saved to your
          Inbox folder.
        </div>
      ) : (
        ""
      )}{" "}
      {props.fileStat ? (
        <div>
          {props.account.locked ? (
            <div className={main.button} onClick={props.saveFile}>
              <div>
                <div className={main.buttontext}>Save</div>
              </div>
            </div>
          ) : (
            <div className={main.button}>
              <div>
                <div className={main.buttontext}>Unlock to allow</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div className={styles.flexer}></div>
      {props.fileStat ? (
        <div>
          {props.account.locked ? (
            ""
          ) : (
            <div className={main.link}>Get me out of here</div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default React.memo(FileReceiveAccept);
