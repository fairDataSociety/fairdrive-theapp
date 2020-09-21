import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";
import QRCode from "react-qr-code";



export function ResolveShort({
    nextStage,
    exitStage,
    peerAvatar,
    peerUsername,
    peerAddress,
    resolveShortcode
}) {
    const [shortcode, setShortcode] = useState();

    const handleResolveShort = () => {
        console.log("Short code to resolve: ", shortcode)
        resolveShortcode(shortcode)

    }

    const handleShortChange = (e) => {
        setShortcode(e.target.value)
    }

    return (
        <div className={createAccount.formcontainer}>
            <div className={createAccount.closeButton} onClick={exitStage}>
                <div className={styles.exitgrayicon} />
            </div>
            <div className={createAccount.titleblue}>
                <input
                    className={createAccount.usernameinput}
                    placeholder="Shortcode"
                    onChange={(e) => handleShortChange(e)}
                    value={shortcode}
                />
            </div>
            <div className={createAccount.flexer} />
            <div onClick={handleResolveShort} className={createAccount.button}>Resolve shortcode</div>
            <div className={createAccount.flexer} />
            <div className={createAccount.placeholder}>
                <img className={createAccount.avatarImage} src={peerAvatar} alt="avatar" />
            </div>
            <div>{peerUsername}</div>
            <div><input type="text" value={peerAddress}></input></div>

        </div>
    )
}

export default ResolveShort;
