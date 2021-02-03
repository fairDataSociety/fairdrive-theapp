import React from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";

const ChooseUsername = ({
  nextStage,
  exitStage,
  avatarStage,
  username,
  setUsername,
  avatar,
  usernameExists,
}) => (
  <div className={accountstyles.formcontainer}>
    <div className={accountstyles.closeButton} onClick={exitStage}>
      <div className={styles.closeicon} />
    </div>
    <div className={accountstyles.title}>Choose an avatar and a username</div>
    <div className={accountstyles.placeholder}>
      <img src={avatar} className={accountstyles.avatarImage} alt="avatar" />
    </div>
    <div className={accountstyles.uploadbtn} />
    <div className={accountstyles.uploadicon} onClick={avatarStage}>
      <div className={accountstyles.arrowup} />
    </div>
    <div className={accountstyles.usernameinputbox}>
      <input
        type="text"
        autoFocus="autoFocus"
        className={accountstyles.usernameinput}
        placeholder="Fairdrive User #1263"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className={accountstyles.usernameExists}>{usernameExists}</div>
    {username.length >= 1 && !usernameExists ? (
      <div className={styles.button} onClick={nextStage}>
        <div>
          <div className={styles.buttontext}>continue</div>
        </div>
      </div>
    ) : (
      ""
    )}
  </div>
);

export default ChooseUsername;
