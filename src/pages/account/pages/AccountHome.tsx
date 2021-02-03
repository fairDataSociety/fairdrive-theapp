import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";
import {
  AccountCircle,
  AccountBalanceWallet,
  Loyalty,
  VerifiedUser,
} from "@material-ui/icons";

export interface Props {
  nextStage?: any;
  exitStage?: any;
  avatar?: any;
  username?: any;
  myIdentityStage: any;
  shortCodeStage: any;
  resolveStage: any;
}
function AccountHome(props: Props) {
  return (
    <div className={createAccount.formcontainer}>
      <div className={createAccount.closeButton} onClick={props.exitStage}>
        <div className={styles.closeicon} />
      </div>
      <div className={createAccount.homemenu}>
        <div className={createAccount.title}>Account</div>
        <div className={createAccount.flexer}></div>

        <div className={createAccount.menuitem} onClick={props.myIdentityStage}>
          <AccountCircle></AccountCircle>
          <div>Account settings</div>
        </div>
        <div className={createAccount.menuitem}>
          <AccountBalanceWallet></AccountBalanceWallet>
          <div>Wallet</div>
        </div>
        <div className={createAccount.menuitem} onClick={props.shortCodeStage}>
          <VerifiedUser></VerifiedUser>
          <div>Get verified</div>
        </div>
        <div className={createAccount.menuitem} onClick={props.resolveStage}>
          <Loyalty></Loyalty>
          <div>Verify a friend</div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(AccountHome);
