import React, { useState } from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";
export interface Props {
  username: string;
  setUsername: any;
  setPassword: any;
  password: any;
  createAccount: any;
  exitStage: any;
  nextStage: any;
}
function AccountCreateFairdriveConnect(props: Props) {
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleInvite = (e: any) => {
    setInvite(e.target.value);
  };

  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.closeButton} onClick={props.exitStage}>
        <div className={styles.closeicon} />
      </div>
      <div className={accountstyles.title}>Choose a username</div>
      <div className={accountstyles.passwordflex} />
      <div className={accountstyles.flexer} />
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
      <div className={accountstyles.usernameinputbox}>
        <input
          type="password"
          autoFocus
          name="1"
          className={accountstyles.mnemonicinput}
          placeholder="Password"
          value={password}
          onChange={(e) => handlePassword(e)}
        />
      </div>
      <div className={accountstyles.usernameinputbox}>
        <input
          type="password"
          name="2"
          className={accountstyles.mnemonicinput}
          placeholder="Fairconnect Invite"
          value={invite}
          onChange={(e) => handleInvite(e)}
        />
      </div>
      <div className={styles.button} onClick={props.createAccount}>
        <div>
          <div className={styles.buttontext}>create account</div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(AccountCreateFairdriveConnect);
