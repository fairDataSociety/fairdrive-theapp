import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { Button } from '@components/Buttons';
import CopyIcon from '@media/UI/copy.svg';
import copyToClipboard from '@utils/copyToClipboard';
import Spinner from '@components/Spinner/Spinner';

const RegisterPayment: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Awaiting Payment...'
  );
  const [copyComplete, setCopyComplete] = useState<boolean>(false);
  const { wallet, fdpClient, username, password, getAccountBalance } =
    useFdpStorage();

  useEffect(() => {
    if (!wallet) {
      router.push('/register');
      return;
    }
    const interval = setInterval(async () => {
      try {
        const balance = await getAccountBalance(wallet.address);

        if (balance.gt(0)) {
          register();
          clearInterval(interval);
        }
      } catch (error) {
        setErrorMessage(error.message);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wallet) {
    return <></>;
  }

  const handleCopyClick = async () => {
    try {
      await copyToClipboard(wallet.address);
      setCopyComplete(true);
      setTimeout(() => setCopyComplete(false), 4000);
    } catch (error) {
      console.log('Could not copy wallet address!');
    }
  };

  const register = async () => {
    try {
      setStatusMessage('Registering user...');
      await fdpClient.account.register(username, password);

      await Promise.all([
        fdpClient.personalStorage.create('Home'),
        fdpClient.personalStorage.create('Consents'),
        fdpClient.personalStorage.create('Images'),
      ]);

      router.push('/overview');
    } catch (error) {
      setErrorMessage(error.message);
      setStatusMessage('Oops, could not register user');
      console.log(error);
    }
  };

  return (
    <AuthenticationLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4">
          <Spinner size="md" />
        </div>
        <AuthenticationHeader
          title={statusMessage}
          content="Fund the address below to complete registration. Your registration will automatically complete once you've funded your wallet"
        />
        <div className="my-6 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>
        <div className="text-xl text-color-accents-plum-black dark:text-color-accents-grey-pastel space-y-6">
          <div>
            <code>{wallet.address}</code>
          </div>

          <div className="text-center">
            <Button
              variant="primary-outlined"
              onClick={handleCopyClick}
              label={copyComplete ? 'Copied!' : 'Copy address'}
              icon={<CopyIcon className="inline ml-2" />}
            />
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterPayment;
