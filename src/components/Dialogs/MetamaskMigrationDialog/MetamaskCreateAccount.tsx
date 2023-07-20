import { Button } from '@components/Buttons';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { useFdpStorage } from '@context/FdpStorageContext';
import UserContext from '@context/UserContext';
import { Network } from '@data/networks';
import { estimateRegistrationPrice, getAccountBalance } from '@utils/ens';
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
  const [hasMinBalance, setHasMinBalance] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);
  const address = fdpClient.account.wallet?.address;

  const checkMinBalance = async (minBalance: BigNumber): Promise<boolean> => {
    const { address } = fdpClient.account.wallet;

    const balance = await getAccountBalance(address, network);

    const hasMinBalance = balance.gte(minBalance);

    setHasMinBalance(hasMinBalance);

    return hasMinBalance;
  };

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
    const { address } = fdpClient.account.wallet;
    const { publicKey } = fdpClient.account;

    const price = await estimateRegistrationPrice(
      username,
      address,
      publicKey,
      network
    );

    setMinBalance(price);

    return price;
  };

  const initialize = async () => {
    try {
      fdpClient.account.setAccountFromMnemonic(mnemonic);
      const minBalance = await getFeePrice();
      await checkMinBalance(minBalance);
    } catch (error) {
      console.error(error);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      initialize();
    });
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="text-sm">
          {initialized ? (
            <>
              <div>
                Your account is: <br />
                <span>
                  {address}
                  <CopyButton text={address} />
                </span>
              </div>
              <div>
                Before proceeding with account registration, make sure you have
                enough funds on it.
              </div>
              <div className="py-3">
                {minBalance
                  ? `Estimated minimal balance is ${utils.formatEther(
                      minBalance
                    )}`
                  : "Gas estimation can't be performed on this network."}
                <div className="pt-1 text-color-shade-dark-2-night dark:text-color-shade-light-2-night">
                  *Info: Sometimes estimated balance is off and account
                  registration will not be able to complete. There are three
                  transactions involved:
                  <ul>
                    <li>ENS registration</li>
                    <li>set ENS resolver </li>
                    <li>public key registration</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>Estimating transaction fee price, please wait...</>
          )}
        </div>
      </div>

      {errorMessage && <FeedbackMessage type="error" message={errorMessage} />}

      {initialized && !hasMinBalance && (
        <div className="mt-5">
          <Button
            variant="tertiary-outlined"
            label="Send Minimal balance"
            disabled={loading}
            onClick={send}
          />
        </div>
      )}

      <div className="mt-5">
        {initialized && (
          <Button
            variant="primary-outlined"
            label={loading ? 'Registering' : 'Register'}
            disabled={loading}
            loading={loading}
            onClick={register}
          />
        )}
      </div>
    </>
  );
}
