import { Button } from '@components/Buttons';
import MetamaskIcon from '@media/UI/metamask.svg';
import { getSignatureWallet, isMetamaskAvailable } from '@utils/metamask';
import { useRouter } from 'next/router';
import { useFdpStorage } from '@context/FdpStorageContext';
import MetamaskNotFoundModal from '@components/Modals/MetamaskNotFoundModal/MetamaskNotFoundModal';
import { useContext, useState } from 'react';
import UserContext from '@context/UserContext';
import Spinner from '@components/Spinner/Spinner';

interface MetamaskConnectProps {
  onConnect: () => void;
  onError: (errorMessage?: string) => void;
}

const MetamaskConnect = ({ onConnect, onError }: MetamaskConnectProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    fdpClient,
    setIsLoggedIn,
    setWallet,
    setFdpStorageType,
    setLoginType,
  } = useFdpStorage();
  const { setErrorMessage } = useContext(UserContext);
  const router = useRouter();

  const connect = async () => {
    try {
      setLoading(true);

      if (!isMetamaskAvailable()) {
        onError('Metamask is not available');
        return;
      }

      const data = await getSignatureWallet();
      fdpClient.account.setAccountFromMnemonic(data.mnemonic.phrase);
      setFdpStorageType('native');
      setIsLoggedIn(true);
      setLoginType('metamask');
      setWallet(data);
      onConnect();
      return router.push('/overview');
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error.message || error));
    } finally {
      setLoading(false);
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
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
};

export default MetamaskConnect;
