import React, { useState } from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";
export interface Props {
  setUsername: any;
  setPassword: any;
  setInvite: any;
  password: any;
  username: string;
  invite: any;
  createAccount: any;
  exitStage: any;
  nextStage: any;
}
function AccountLoginWithGetLoginETH(props: Props) {
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const handlePassword = (e: any) => {
    props.setPassword(e.target.value);
  };
  const handleInvite = (e: any) => {
    props.setInvite(e.target.value);
  };

  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.closeButton} onClick={props.exitStage}>
        <div className={styles.closeicon} />
      </div>
      <div className={accountstyles.title}>Connect with GetLoginETH</div>
      <div className={accountstyles.passwordflex} />
      <div className={accountstyles.flexer} />
      <div className={accountstyles.usernameinputbox}>
        <input
          type="text"
          autoFocus={true}
          className={accountstyles.getLoginUsernameInput}
          placeholder="Username"
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
          value={props.password}
          onChange={(e) => handlePassword(e)}
        />
      </div>
      <div className={accountstyles.usernameinputbox}>
        <input
          type="text"
          name="2"
          className={accountstyles.mnemonicinput}
          placeholder="GetLogin Invite"
          value={props.invite}
          onChange={(e) => handleInvite(e)}
        />
      </div>

      <div className={styles.button} onClick={props.createAccount}>
        <div>
          <div className={styles.buttontext}>
            Login with GetLoginETH account
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(AccountLoginWithGetLoginETH);
