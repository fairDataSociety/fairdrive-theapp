import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";

export interface Props {
  nextStage: any;
  exitStage: any;
  shortcode: any;
  newShort: any;
}

function ShortCode(props: Props) {
  return (
    <div className={createAccount.formcontainer}>
      <div className={createAccount.closeButton} onClick={props.exitStage}>
        <div className={styles.exitgrayicon} />
      </div>
      <div className={createAccount.titleblue}>{props.shortcode.code}</div>
      {/* <div onClick={() => } className={createAccount.showkeystoggle}>show publicKey</div> */}
      <div className={createAccount.flexer} />
      <div onClick={props.newShort} className={createAccount.button}>
        New shortcode plz
      </div>
    </div>
  );
}
export default React.memo(ShortCode);
