import React, { useState } from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";
import { Check } from "@material-ui/icons";

export function CreatingAccount({
  accountCreateDone,
  item0,
  item1,
  item2,
  item3,
  nextStage,
}) {
  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.title}>Your Fairdrive is being created</div>
      <div className={accountstyles.statusbox}>
        {item0 ? (
          <Check
            style={{
              color: "#DB7362",
            }}
          ></Check>
        ) : (
          <Check
            style={{
              color: "#333333",
            }}
          ></Check>
        )}
        {item0 ? (
          <div
            style={{
              color: "#DB7362",
            }}
          >
            Creating User Account
          </div>
        ) : (
          <div>Creating User Account</div>
        )}
        {item1 ? (
          <Check
            style={{
              color: "#DB7362",
            }}
          ></Check>
        ) : (
          <Check
            style={{
              color: "#333333",
            }}
          ></Check>
        )}
        {item1 ? (
          <div
            style={{
              color: "#DB7362",
            }}
          >
            Creating Fairdrive
          </div>
        ) : (
          <div>Creating Fairdrive</div>
        )}
        {item2 ? (
          <Check
            style={{
              color: "#DB7362",
            }}
          ></Check>
        ) : (
          <Check
            style={{
              color: "#333333",
            }}
          ></Check>
        )}
        {item2 ? (
          <div
            style={{
              color: "#DB7362",
            }}
          >
            Creating Folders
          </div>
        ) : (
          <div>Creating Folders</div>
        )}
        {item3 ? (
          <Check
            style={{
              color: "#DB7362",
            }}
          ></Check>
        ) : (
          <Check
            style={{
              color: "#333333",
            }}
          ></Check>
        )}
        {item3 ? (
          <div
            style={{
              color: "#DB7362",
            }}
          >
            Storing Fairdrive Account
          </div>
        ) : (
          <div>Storing Fairdrive Account</div>
        )}
      </div>

      {item0 && item1 && item2 && item3 ? (
        <div tabIndex="2" className={styles.button} onClick={nextStage}>
          <div>
            <div className={styles.buttontext}>To your account</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreatingAccount;
