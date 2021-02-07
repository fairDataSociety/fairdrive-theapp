import React, { useState } from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";
import { Check } from "@material-ui/icons";

export interface Props {
  accountCreateDone: any;
  item0: any;
  item1: any;
  item2: any;
  item3: any;
  nextStage: any;
}
function CreatingAccount(props: Props) {
  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.title}>Your Fairdrive is being created</div>
      <div className={accountstyles.statusbox}>
        {props.item0 ? (
          <Check
            style={{
              color: "#FFFFFF",
            }}
          ></Check>
        ) : (
            <Check
              style={{
                color: "#333333",
              }}
            ></Check>
          )}
        {props.item0 ? (
          <div
            style={{
              color: "#FFFFFF",
            }}
          >
            Creating User Account
          </div>
        ) : (
            <div>Creating User Account</div>
          )}
        {props.item1 ? (
          <Check
            style={{
              color: "#FFFFFF",
            }}
          ></Check>
        ) : (
            <Check
              style={{
                color: "#333333",
              }}
            ></Check>
          )}
        {props.item1 ? (
          <div
            style={{
              color: "#FFFFFF",
            }}
          >
            Creating Fairdrive
          </div>
        ) : (
            <div>Creating Fairdrive</div>
          )}
        {props.item2 ? (
          <Check
            style={{
              color: "#FFFFFF",
            }}
          ></Check>
        ) : (
            <Check
              style={{
                color: "#333333",
              }}
            ></Check>
          )}
        {props.item2 ? (
          <div
            style={{
              color: "#FFFFFF",
            }}
          >
            Creating Folders
          </div>
        ) : (
            <div>Creating Folders</div>
          )}
        {props.item3 ? (
          <Check
            style={{
              color: "#FFFFFF",
            }}
          ></Check>
        ) : (
            <Check
              style={{
                color: "#333333",
              }}
            ></Check>
          )}
        {props.item3 ? (
          <div
            style={{
              color: "#FFFFFF",
            }}
          >
            Storing Fairdrive Account
          </div>
        ) : (
            <div>Storing Fairdrive Account</div>
          )}
      </div>

      {props.item0 && props.item1 && props.item2 && props.item3 ? (
        <div tabIndex={2} className={styles.button} onClick={props.nextStage}>
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

export default React.memo(CreatingAccount);
