import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import DialogWrapper from '../DialogWrapper';
import MetamaskIntroContent from './MetamaskIntroContent';
import MetamaskMnemonicExport from './MetamaskMnemonicExport';
import MetamaskUsernamePassword from './MetamaskUsernamePassword';
import MetamaskMigrationComplete from './MetamaskMigrationComplete';
import MetamaskCreateAccount from './MetamaskCreateAccount';
import { Network } from '@data/networks';
import UserContext from '@context/UserContext';
import { useLocales } from '@context/LocalesContext';

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
  const { setMetamaskMigrationNotification, address } = useContext(UserContext);
  const { intl } = useLocales();

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

  const handleClose = (clickOutside: boolean) => {
    if (clickOutside) {
      return;
    }
    setMetamaskMigrationNotification(
      step === Step.COMPLETE ? 'completed' : 'closed'
    );
    onClose();
  };

  const handleComplete = () => {
    setMetamaskMigrationNotification('completed');
    onClose();
  };

  return (
    <DialogWrapper open={open} onClose={handleClose}>
      <>
        <Dialog.Title as="h3" className="text-lg font-medium leading-6">
          {intl.get('ACCOUNT_MIGRATION')}
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
          <MetamaskMigrationComplete
            address={address}
            username={username}
            onConfirm={handleComplete}
          />
        )}
      </>
    </DialogWrapper>
  );
};

export default MetamaskMigrationDialog;
