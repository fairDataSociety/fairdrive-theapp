import { Button } from '@components/Buttons';
import MetamaskIcon from '@media/UI/metamask.svg';
import {
  decryptWallet,
  getBasicSignatureWallet,
  isMetamaskAvailable,
} from '@utils/metamask';
import { useRouter } from 'next/router';
import { useFdpStorage } from '@context/FdpStorageContext';
import MetamaskNotFoundModal from '@components/Modals/MetamaskNotFoundModal/MetamaskNotFoundModal';
import { useContext, useState } from 'react';
import UserContext from '@context/UserContext';
import Spinner from '@components/Spinner/Spinner';
import { getInvite, login } from '@utils/invite';
import PasswordModal from '@components/Modals/PasswordModal/PasswordModal';

interface MetamaskConnectProps {
  onConnect: () => void;
  onError: (errorMessage?: string) => void;
}

const MetamaskConnect = ({ onConnect }: MetamaskConnectProps) => {
  const [localBasicWallet, setLocalBasicWallet] = useState(null);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    fdpClientRef,
    setIsLoggedIn,
    setWallet,
    setFdpStorageType,
    setLoginType,
  } = useFdpStorage();
  const { setErrorMessage, setAddress, setMnemonic } = useContext(UserContext);
  const router = useRouter();

  /**
   * When user retrieved `signature wallet` from metamask - send info that invite was participated
   */
  const markInviteAsParticipated = async () => {
    try {
      const savedInvite = getInvite();
      if (savedInvite) {
        await login(savedInvite);
      }
    } catch (e) {
      console.error('Can not mark the invite as participated', e);
    }
  };

  /**
   * Handle password submission
   *
   * @param password Password from modal input
   */
  const handlePassword = async (password: string): Promise<void> => {
    try {
      const wallet = await decryptWallet(localBasicWallet, password);
      const mnemonic = wallet.mnemonic.phrase;
      markInviteAsParticipated();
      fdpClientRef.current.account.setAccountFromMnemonic(mnemonic);
      setFdpStorageType('native');
      setIsLoggedIn(true);
      setLoginType('metamask');
      setWallet(wallet);
      onConnect();
      setAddress(wallet.address);
      setMnemonic(mnemonic);

      router.push('/overview');
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error.message || error));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clicking my connect to metamask button
   */
  const connect = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!isMetamaskAvailable()) {
        setShowNotFoundModal(true);
        return;
      }

      setLocalBasicWallet(await getBasicSignatureWallet());
      setShowPasswordModal(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error.message || error));
    }
  };

  return (
    <>
      <Button
        variant="tertiary-outlined"
        className="w-28 h-10 relative text-color-accents-purple-black dark:text-color-accents-grey-lavendar"
        label="Metamask"
        disabled={loading}
        icon={
          loading ? (
            <Spinner className="absolute top-3 left-6" />
          ) : (
            <MetamaskIcon className="inline-block ml-2" />
          )
        }
        onClick={connect}
      />
      <MetamaskNotFoundModal
        showModal={showNotFoundModal}
        closeModal={() => setShowNotFoundModal(false)}
      />
      <PasswordModal
        showModal={showPasswordModal}
        closeModal={() => {
          setShowPasswordModal(false);
          setLoading(false);
        }}
        handleSubmitForm={handlePassword}
      />
    </>
  );
};

export default MetamaskConnect;
