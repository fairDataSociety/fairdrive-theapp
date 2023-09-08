import { Button } from '@components/Buttons';
import MetamaskIcon from '@media/UI/metamask.svg';
import {
  decryptWallet,
  getBasicSignatureWallet,
  getMetamaskDeeplinkUrl,
  isMetamaskAvailable,
} from '@utils/metamask';
import { useRouter } from 'next/router';
import { getDefaultNetwork, useFdpStorage } from '@context/FdpStorageContext';
import MetamaskNotFoundModal from '@components/Modals/MetamaskNotFoundModal/MetamaskNotFoundModal';
import { useContext, useEffect, useState } from 'react';
import UserContext from '@context/UserContext';
import Spinner from '@components/Spinner/Spinner';
import { getInvite, login } from '@utils/invite';
import PasswordModal from '@components/Modals/PasswordModal/PasswordModal';
import { isMobile } from 'react-device-detect';
import { useMetamask } from '@context/MetamaskContext';
import { Network } from '@data/networks';

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
  const { connectMetamask, metamaskProvider, metamaskWalletAddress } =
    useMetamask();
  const [network] = useState<Network>(getDefaultNetwork());

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
      setFdpStorageType('native', network.config);
      fdpClientRef.current.account.setAccountFromMnemonic(mnemonic);
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
   * Connect to metamask
   */
  const connectMetamaskHandle = async (): Promise<void> => {
    if (isMobile && !isMetamaskAvailable()) {
      // If a user visits Fairdrive on a mobile device and wants to use Metamask,
      // the site will be opened in the Metamask browser
      window.open(
        getMetamaskDeeplinkUrl(process.env.NEXT_PUBLIC_FAIRDRIVEHOST)
      );

      return;
    }

    try {
      setLoading(true);
      await connectMetamask();
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error.message || error));
      setLoading(false);
    }
  };

  useEffect(() => {
    async function run() {
      if (!(metamaskProvider && metamaskWalletAddress)) {
        return;
      }

      try {
        setLocalBasicWallet(
          await getBasicSignatureWallet(metamaskProvider, metamaskWalletAddress)
        );

        setShowPasswordModal(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [metamaskProvider, metamaskWalletAddress]);

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
        onClick={connectMetamaskHandle}
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
