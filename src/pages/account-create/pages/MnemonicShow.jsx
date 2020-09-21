import React, {useEffect} from "react";
import main from "styles.module.css";
import accountstyles from "../account-create.module.css";
import ethers from "ethers";
import generateMnemonic from "helpers/utils";

export function MnemonicShow({
  nextStage,
  exitStage,
  setMnemonic,
  mnemonic,
  setWallet,
  setCollection,
  fairdrive
}) {
  useEffect(() => {
    createMnemonicArray().then(array => {
      setMnemonic(array);
    });
  }, [setMnemonic]);

  async function createMnemonicArray() {
    const mnemonic = await generateMnemonic();
    console.log(mnemonic);
    const array = mnemonic.split(" ");
    return array;
  }

  return (<div className={accountstyles.container}>
    <div className={accountstyles.closeButton} onClick={exitStage}>
      <div className={main.closeicon}/>
    </div>
    <div className={accountstyles.title}>Write down this seed phrase</div>
    <div className={accountstyles.subtitle}>
      With it, you will always be able to restore your account.
    </div>

    <div className={accountstyles.mnemonic}>
      {mnemonic.map((word, index) => (<div key={index}>{index + 1 + ". " + word}</div>))}
    </div>
    {
      mnemonic.length >= 1
        ? (<div tabIndex="2" className={main.button} onClick={nextStage}>
          <div>
            <div className={main.buttontext}>continue</div>
          </div>
        </div>)
        : ("")
    }
  </div>);
}

export default MnemonicShow;
