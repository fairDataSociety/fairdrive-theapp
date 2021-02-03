import React from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";

export interface Props {
  nextStage: any;
  removeAccount: any;
}
function RemoveAccount(props: Props) {
  return (
    <div className={createAccount.containerred}>
      <div className={createAccount.title}>
        Do you want to remove your account?
      </div>
      <div className={createAccount.subtitle}>
        This will permanently remove your account. You can only restore with the
        mnemonic (wordlist).
      </div>
      <div className={createAccount.flexer} />
      <div className={createAccount.flexer} />
      <div className={createAccount.dialogiconbox}>
        <div
          className={[styles.iconbuttonbig, createAccount.cancel].join(" ")}
          onClick={props.nextStage}
        >
          <div className={styles.xmarkicon} />
        </div>
        <div
          className={[styles.iconbuttonbig, createAccount.confirm].join(" ")}
          onClick={props.removeAccount}
        >
          <div className={styles.vmarkicon} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(RemoveAccount);
