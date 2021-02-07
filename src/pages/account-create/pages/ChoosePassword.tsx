import React, { useState } from "react";
import styles from "styles.module.css";
import accountstyles from "../account-create.module.css";

export interface Props {
  exitStage: any;
  restoreStage: any;
  createAccount: any;
  nextStage: any;
  setPassword: any;
  password: any;
}

function ChoosePassword(props: Props) {
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handlePassword1 = (e: any) => {
    setPassword1(e.target.value);
    checkPasswordValidity(e.target.value, password2);
  };

  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value);
    checkPasswordValidity(e.target.value, password1);
  };

  const checkPasswordValidity = (a: string, b: string) => {
    if (a !== "" || b !== "") {
      if (a === b) {
        setPasswordMatch(true);
        props.setPassword(a);
      } else {
        setPasswordMatch(false);
      }
    }
  };

  return (
    <div className={accountstyles.formcontainer}>
      <div className={accountstyles.closeButton} onClick={props.exitStage}>
        <div className={styles.closeicon} />
      </div>
      <div className={accountstyles.title}>Choose a password</div>
      <div className={accountstyles.passwordflex} />
      <div className={accountstyles.flexer} />

      <div className={accountstyles.usernameinputbox}>
        <input
          type="password"
          autoFocus
          name="1"
          className={accountstyles.mnemonicinput}
          placeholder="Password"
          value={password1}
          onChange={(e) => handlePassword1(e)}
        />
      </div>
      <div className={accountstyles.usernameinputbox}>
        <input
          type="password"
          name="2"
          className={accountstyles.mnemonicinput}
          placeholder="Control"
          value={password2}
          onChange={(e) => handlePassword2(e)}
        />
      </div>
      {passwordMatch ? (
        <div className={styles.button} onClick={props.createAccount}>
          <div>
            <div className={styles.buttontext}>set password</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default React.memo(ChoosePassword);
