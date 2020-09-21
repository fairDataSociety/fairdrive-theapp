import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";
import QRCode from "react-qr-code";


const ShortCode = ({
    nextStage,
    exitStage,
    shortcode = { code: '' },
    newShort
}) => (
        <div className={createAccount.formcontainer}>
            <div className={createAccount.closeButton} onClick={exitStage}>
                <div className={styles.exitgrayicon} />
            </div>
            <div className={createAccount.titleblue}>
                {shortcode.code}
            </div>
            {/* <div onClick={() => } className={createAccount.showkeystoggle}>show publicKey</div> */}
            <div className={createAccount.flexer} />
            <div onClick={newShort} className={createAccount.button}>New shortcode plz</div>
        </div>
    );

export default ShortCode;
