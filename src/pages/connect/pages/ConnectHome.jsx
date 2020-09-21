import React, { useState } from "react";
import main from "styles.module.css";
import connect from "../connect.module.css";
import { useDispatch } from "react-redux"

export function ConnectHome({
    nextStage,
    exitStage,
    appname,
    appicon,
    account = { locked: true }
}) {
    console.log('connect home')
    const dispatch = useDispatch()
    return (

        <div className={connect.container}>
            <div className={connect.title}>Fairdrive Connect</div>
            <div className={connect.flexer}></div>

            {appicon ? <div><img src={appicon} className={connect.appicon}></img></div> : ""}
            {appname ? <div className={connect.subtitle}><b>{appname}</b> wants to connect to  Fairdrive. It will get it's own folder to write in.</div> : ""}
            {appname && appicon ?
                <div>
                    {account.locked ?
                        <div tabIndex="2" className={main.button} onClick={nextStage}>
                            <div>
                                <div className={main.buttontext}>Allow</div>
                            </div>
                        </div>
                        :
                        <div tabIndex="2" className={main.button} onClick={() => dispatch({ type: 'SET_SYSTEM', data: { passwordShow: true } })}>
                            <div>
                                <div className={main.buttontext}>Unlock to allow</div>
                            </div>
                        </div>
                    }
                </div> : ""}

            <div className={connect.flexer}></div>
            {appname && appicon ?

                <div>{account.locked ? "" : <div className={main.link}>Get me out of here</div>}</div>
                : ""}
        </div>
    )
}

export default ConnectHome;