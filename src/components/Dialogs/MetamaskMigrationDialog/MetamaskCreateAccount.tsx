import { Button } from '@components/Buttons';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { useFdpStorage } from '@context/FdpStorageContext';
import UserContext from '@context/UserContext';
import { Network } from '@data/networks';
import { estimateRegistrationPrice } from '@utils/ens';
import { sendAmount } from '@utils/metamask';
import { BigNumber, utils } from 'ethers';
import { useContext, useEffect, useState } from 'react';

interface MetamaskCreateAccountProps {
  username: string;
  password: string;
  mnemonic: string;
  network: Network;
  onConfirm: () => void;
}

export default function MetamaskCreateAccount({
  username,
  password,
  mnemonic,
  network,
  onConfirm,
}: MetamaskCreateAccountProps) {
  const {
    fdpClient,
    setWallet,
    setFdpStorageType,
    setIsLoggedIn,
    setLoginType,
  } = useFdpStorage();
  const [minBalance, setMinBalance] = useState<BigNumber | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);
  const address = fdpClient.account.wallet?.address;

  const register = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      await fdpClient.account.register(username, password);
      setWallet(fdpClient.account.wallet);
      setFdpStorageType('native');
      setIsLoggedIn(true);
      setLoginType('username');
      setUser(username);

      onConfirm();
    } catch (error) {
      setErrorMessage(String(error));
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    await sendAmount(address, utils.formatEther(minBalance));
  };

  const getFeePrice = async () => {
    try {
      const { address } = fdpClient.account.wallet;
      const { publicKey } = fdpClient.account;

      const price = await estimateRegistrationPrice(
        username,
        address,
        publicKey,
        network
      );

      setMinBalance(price);
    } catch (error) {
      console.error(error);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fdpClient.account.setAccountFromMnemonic(mnemonic);
      getFeePrice();
    });
  }, []);

  return (
    <>
      <div className="mt-4">
        <p className="text-sm">
          {initialized ? (
            <>
              Before proceeding with registration, make sure you have enough
              funds on your account: <br />
              <span>
                {address}
                <CopyButton text={address} />
              </span>
              <br />
              <br />
              {minBalance
                ? `Estimated minimal balance is ${utils.formatEther(
                    minBalance
                  )}`
                : "Gas estimation can't be performed on this network."}
            </>
          ) : (
            <>Estimating transaction fee price, please wait...</>
          )}
        </p>
      </div>

      {errorMessage && <FeedbackMessage type="error" message={errorMessage} />}

      {minBalance && (
        <div className="mt-5">
          <Button variant="tertiary-outlined" label="Send" onClick={send} />
        </div>
      )}

      <div className="mt-5">
        <Button
          variant="primary-outlined"
          label={loading ? 'Registering' : 'Register'}
          disabled={loading}
          loading={loading}
          onClick={register}
        />
      </div>
    </>
  );
}
