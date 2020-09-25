import React, {useState, useEffect} from "react";
import styles from "styles.module.css";
import {useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {Dialog} from "@material-ui/core";
import {Input} from "react-advanced-form-addons";

import {restoreAccount, logIn, getAvatar} from "helpers/apiCalls";

function getAccount(state) {
  return state.account;
}

function getSystem(state) {
  return state.system;
}

export default function RestoreAccount({open}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector(state => getAccount(state));
  const system = useSelector(state => getSystem(state));

  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();

  const handleSetUsername = e => {
    setUsername(e.target.value);
  };

  const handleSetPassword = e => {
    setPassword(e.target.value);
  };

  const handleSetAddress = e => {
    setAddress(e.target.value);
  };

  async function onRestore() {
    const isUserLoggedIn = await logIn(username, password).catch(e => console.error(e));
    console.log(isUserLoggedIn);

    if (isUserLoggedIn.data.code == 200) {
      const avatar = await getAvatar(username);
      console.log(avatar);
      dispatch({
        type: "SET_ACCOUNT",
        data: {
          username: username,
          avatar: avatar,
          balance: 0.0
        }
      });

      dispatch({
        type: "SET_SYSTEM",
        data: {
          passWord: password
        }
      });

      console.log(avatar);
      history.push("/drive/root");
    } else {
      console.log("user not logged in");
    }
  }

  useEffect(() => {
    console.log(system);
    if (system.unlocked) {
      history.push("/drive/root");
    }
  });

  return (<div className={styles.dialogBox}>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>
    <div className={styles.title}>Restore your account</div>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>

    <div className={styles.dialogPasswordBox}>
      <input id="username" className={styles.dialogPassword} type="text" placeholder="Username" onChange={e => handleSetUsername(e)}></input>
    </div>

    <div className={styles.dialogPasswordBox}>
      <input id="address" className={styles.dialogPassword} type="text" placeholder="Address" onChange={e => handleSetAddress(e)}></input>
    </div>

    <div className={styles.dialogPasswordBox}>
      <input id="password" className={styles.dialogPassword} type="password" placeholder="Password" onChange={e => handleSetPassword(e)}></input>
    </div>
    <div className={styles.flexer}></div>
    <div className={styles.flexer}></div>

    <div tabIndex="2" className={styles.button} onClick={onRestore}>
      <div>
        <div className={styles.buttontext}>continue</div>
      </div>
    </div>
  </div>);
}
