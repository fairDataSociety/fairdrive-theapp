import React, { useState } from 'react';
import styles from "styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@material-ui/core";
import { Input } from 'react-advanced-form-addons'

function getAccount(state) {
    return state.account
}

export default function PasswordUnlock({ open }) {

    const dispatch = useDispatch()
    const account = useSelector(state => getAccount(state))

    const [password, setPassword] = useState()

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
    }

    return (

        <Dialog fullScreen
            open={open}>
            <div className={styles.dialogBox}>
                <div className={styles.flexer}></div>
                <div className={styles.flexer}></div>
                <div className={styles.flexer}></div>
                <div className={styles.flexer}></div>
                <div className={styles.title}>Unlock your account</div>
                <div className={styles.flexer}></div>
                <div className={styles.flexer}></div>
                <div className={styles.flexer}></div>

                <img src={account.avatar} className={styles.dialogAvatar}></img>
                <div className={styles.dialogPasswordBox}>
                    <input className={styles.dialogPassword} type="password" placeholder="Password" onChange={(e) => handleSetPassword(e)}></input>
                </div>

                <div tabIndex="2" className={styles.button}
                    onClick={() => dispatch({ type: 'UNLOCK_SYSTEM', data: { passWord: password } })}
                >
                    <div>
                        <div className={styles.buttontext}>continue</div>
                    </div>
                </div>

                <div className={styles.flexer}></div>
                <div className={styles.link}
                    onClick={() => dispatch({ type: 'SET_SYSTEM', data: { showPasswordUnlock: false } })}>
                    Get me out of here
                        </div>








            </div>
        </Dialog>)
}
