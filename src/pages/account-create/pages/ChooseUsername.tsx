import React from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";

export interface Props {
  nextStage: any;
  exitStage: any;
  avatarStage: any;
  username: any;
  setUsername: any;
  avatar: any;
  usernameExists: any;
}
function ChooseUsername(props: Props) {
  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.closeButton} onClick={props.exitStage}>
        <div className={styles.closeicon} />
      </div>
      <div className={accountstyles.title}>Choose an avatar and a username</div>
      <div className={accountstyles.placeholder}>
        <img
          src={props.avatar}
          className={accountstyles.avatarImage}
          alt="avatar"
        />
      </div>
      <div className={accountstyles.uploadbtn} />
      <div className={accountstyles.uploadicon} onClick={props.avatarStage}>
        <div className={accountstyles.arrowup} />
      </div>
      <div className={accountstyles.usernameinputbox}>
        <input
          type="text"
          autoFocus={true}
          className={accountstyles.usernameinput}
          placeholder="Fairdrive User #1263"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
        />
      </div>
      <div className={accountstyles.usernameExists}>{props.usernameExists}</div>
      {props.username.length >= 1 && !props.usernameExists ? (
        <div className={styles.button} onClick={props.nextStage}>
          <div>
            <div className={styles.buttontext}>continue</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(ChooseUsername);
