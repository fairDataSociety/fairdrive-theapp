import React, { useEffect } from "react";
import main from "styles.module.css";
import accountstyles from "../account-create.module.css";
import ethers from "ethers";
import generateMnemonic from "../../../helpers/utils";
export interface Props {
  nextStage: any;
  exitStage: any;
  setMnemonic: any;
  mnemonic: any;
}
function MnemonicShow(props: Props) {
  useEffect(() => {
    createMnemonicArray().then((array) => {
      props.setMnemonic(array);
    });
  }, [props.setMnemonic]);

  async function createMnemonicArray() {
    const mnemonic = await generateMnemonic();
    console.log(mnemonic);
    const array = mnemonic.split(" ");
    return array;
  }

  return (
    <div className={accountstyles.container}>
      <div className={accountstyles.closeButton} onClick={props.exitStage}>
        <div className={main.closeicon} />
      </div>
      <div className={accountstyles.title}>Write down this seed phrase</div>
      <div className={accountstyles.subtitle}>
        With it, you will always be able to restore your account.
      </div>

      <div className={accountstyles.mnemonic}>
        {props.mnemonic.map((word: any, index: any) => (
          <div key={index}>{index + 1 + ". " + word}</div>
        ))}
      </div>
      {props.mnemonic.length >= 1 ? (
        <div className={main.button} onClick={props.nextStage}>
          <div>
            <div className={main.buttontext}>continue</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default React.memo(MnemonicShow);
