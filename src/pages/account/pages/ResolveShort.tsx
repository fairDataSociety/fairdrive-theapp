import React, { useState } from "react";
import styles from "styles.module.css";
import createAccount from "../account.module.css";

export interface Props {
  nextStage: any;
  exitStage: any;
  peerAvatar: any;
  peerUsername: any;
  peerAddress: any;
  resolveShortcode: any;
}

function ResolveShort(props: Props) {
  const [shortcode, setShortcode] = useState();

  const handleResolveShort = () => {
    console.log("Short code to resolve: ", shortcode);

    //need to call an action using context
    props.resolveShortcode(shortcode);
  };

  const handleShortChange = (e: any) => {
    setShortcode(e.target.value);
  };

  return (
    <div className={createAccount.formcontainer}>
      <div className={createAccount.closeButton} onClick={props.exitStage}>
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
      <div onClick={handleResolveShort} className={createAccount.button}>
        Resolve shortcode
      </div>
      <div className={createAccount.flexer} />
      <div className={createAccount.placeholder}>
        <img
          className={createAccount.avatarImage}
          src={props.peerAvatar}
          alt="avatar"
        />
      </div>
      <div>{props.peerUsername}</div>
      <div>
        <input type="text" value={props.peerAddress}></input>
      </div>
    </div>
  );
}
export default React.memo(ResolveShort);
