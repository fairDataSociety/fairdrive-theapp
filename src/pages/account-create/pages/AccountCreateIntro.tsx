import React from "react";
import main from "styles.module.css";
// import accountstyles from "../account-create.module.css";
import { useHistory } from "react-router-dom";

export interface Props {
  createStage: any;
  exitStage: any;
  restoreStage: any;
}

function AccountCreateIntro(props: Props) {
  const history = useHistory();

  function gotoUnlock() {
    history.push("/login");
  }

  return (
    <div className={main.container}>
      <div className={main.title}>Welcome to Fairdrive</div>
      <div className={main.subtitle}>
        In the next steps you will be creating a Fairdrive Wallet.
      </div>

      <div className={main.button} onClick={props.createStage}>
        <div>
          <div className={main.buttontext}>create account</div>
        </div>
      </div>

      {/* <div tabIndex="2" className={main.button}>
      <div>
        <div className={main.buttontext} onClick={restoreStage}>
          restore account
        </div>
      </div>
    </div> */}
      <div className={main.flexer}></div>
      <div className={main.flexer}></div>

      <div className={main.link} onClick={gotoUnlock}>
        Login with existing account
      </div>
    </div>
  );
}

export default React.memo(AccountCreateIntro);
