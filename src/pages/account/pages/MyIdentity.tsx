import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";

export interface Props {
  nextStage: any;
  exitStage: any;
  shortCode: any;
  resolveShort: any;
  avatarStage: any;
  avatar: any;
  username: any;
  setUsername: any;
  publicKey: any;
  address: any;
  QR?: any;
  logOut: any;
  setAvatar: any;
}
function MyIdentity(props: Props) {
  return (
    <div className={createAccount.formcontainer}>
      <div className={createAccount.closeButton} onClick={props.exitStage}>
        <div className={styles.exitgrayicon} />
      </div>
      {/* <div onClick={shortCode}>CREATE SHORT</div>
            <div onClick={resolveShort}>FIND SHORT</div> */}
      <div onClick={props.avatarStage} className={createAccount.placeholder}>
        <img
          className={createAccount.avatarImage}
          src={props.avatar}
          alt="avatar"
        />
      </div>
      <div className={createAccount.subtitle}>{props.username}</div>
      {/* <div>
    <QRCode size="128" value={address}></QRCode>
  </div> */}
      <div className={createAccount.flexer} />{" "}
      {/* <div  className={styles.button} onClick={nextStage}>
    <div>
      <div className={styles.buttontext}>edit account</div>
    </div>
  </div> */}
      <div className={styles.flexer}></div>
      <div className={styles.link} onClick={props.logOut}>
        Logout
      </div>
    </div>
  );
}
export default React.memo(MyIdentity);
