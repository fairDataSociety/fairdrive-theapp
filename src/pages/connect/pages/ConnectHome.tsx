import React, { useState } from "react";
import main from "styles.module.css";
import connect from "../connect.module.css";
import { useDispatch } from "react-redux";

export interface Props {
  nextStage: any;
  exitStage: any;
  appname: any;
  appicon: any;
  account: {
    locked: true;
  };
  id: any;
}
function ConnectHome(props: Props) {
  console.log("connect home");
  const dispatch = useDispatch();
  return (
    <div className={connect.container}>
      <div className={connect.title}>Fairdrive Connect</div>
      <div className={connect.flexer}></div>

      {props.appicon ? (
        <div>
          <img src={props.appicon} className={connect.appicon}></img>
        </div>
      ) : (
        ""
      )}
      {props.appname ? (
        <div className={connect.subtitle}>
          <b>{props.appname}</b> wants to connect to Fairdrive. It will get it's
          own folder to write in.
        </div>
      ) : (
        ""
      )}
      {props.appname && props.appicon ? (
        <div>
          {props.account.locked ? (
            <div className={main.button} onClick={props.nextStage}>
              <div>
                <div className={main.buttontext}>Allow</div>
              </div>
            </div>
          ) : (
            <div
              className={main.button}
              onClick={() =>
                dispatch({ type: "SET_SYSTEM", data: { passwordShow: true } })
              }
            >
              <div>
                <div className={main.buttontext}>Unlock to allow</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      <div className={connect.flexer}></div>
      {props.appname && props.appicon ? (
        <div>
          {props.account.locked ? (
            ""
          ) : (
            <div className={main.link}>Get me out of here</div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(ConnectHome);
