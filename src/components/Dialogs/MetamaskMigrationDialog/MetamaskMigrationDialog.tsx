import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import DialogWrapper from '../DialogWrapper';
import MetamaskIntroContent from './MetamaskIntroContent';
import MetamaskMnemonicExport from './MetamaskMnemonicExport';
import MetamaskUsernamePassword from './MetamaskUsernamePassword';
import MetamaskMigrationComplete from './MetamaskMigrationComplete';
import MetamaskCreateAccount from './MetamaskCreateAccount';
import { Network } from '@data/networks';

interface MetamaskMigrationDialogProps {
  open: boolean;
  onClose: () => void;
}

enum Step {
  INTRO,
  MNEMONIC,
  USERNAME,
  REGISTER,
  COMPLETE,
}

const MetamaskMigrationDialog = ({
  open,
  onClose,
}: MetamaskMigrationDialogProps) => {
  const [step, setStep] = useState<Step>(Step.INTRO);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [network, setNetwork] = useState<Network>(null);

  const onMnemonicExport = (mnemonic: string) => {
    setMnemonic(mnemonic);
    setStep(Step.USERNAME);
  };

  const onUsernameAndPasswordEnter = (
    username: string,
    password: string,
    network: Network
  ) => {
    setUsername(username);
    setPassword(password);
    setNetwork(network);
    setStep(Step.REGISTER);
  };

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <>
        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
          Account Migration
        </Dialog.Title>
        {step === Step.INTRO && (
          <MetamaskIntroContent onConfirm={() => setStep(Step.MNEMONIC)} />
        )}
        {step === Step.MNEMONIC && (
          <MetamaskMnemonicExport onConfirm={onMnemonicExport} />
        )}
        {step === Step.USERNAME && (
          <MetamaskUsernamePassword onConfirm={onUsernameAndPasswordEnter} />
        )}
        {step === Step.REGISTER && (
          <MetamaskCreateAccount
            username={username}
            password={password}
            mnemonic={mnemonic}
            network={network}
            onConfirm={() => setStep(Step.COMPLETE)}
          />
        )}
        {step === Step.COMPLETE && (
          <MetamaskMigrationComplete onConfirm={onClose} />
        )}
      </>
    </DialogWrapper>
  );
};

export default MetamaskMigrationDialog;
