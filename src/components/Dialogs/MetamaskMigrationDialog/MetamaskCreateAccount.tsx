import { Button } from '@components/Buttons';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { useFdpStorage } from '@context/FdpStorageContext';
import UserContext from '@context/UserContext';
import { Network } from '@data/networks';
import { estimateRegistrationPrice, getAccountBalance } from '@utils/ens';
import { sendAmount, switchToNetwork } from '@utils/metamask';
import { BigNumber, utils } from 'ethers';
import { useContext, useEffect, useRef, useState } from 'react';
import InfoLight from '@media/UI/info-light.svg';
import InfoDark from '@media/UI/info-dark.svg';
import ThemeContext from '@context/ThemeContext';
import { RegistrationRequest } from '@fairdatasociety/fdp-storage/dist/account/types';
import { useLocales } from '@context/LocalesContext';
import { useMetamask } from '@context/MetamaskContext';

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
    fdpClientRef,
    setWallet,
    setFdpStorageType,
    setIsLoggedIn,
    setLoginType,
  } = useFdpStorage();
  const [minBalance, setMinBalance] = useState<BigNumber | null>(null);
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [registrationRequest, setRegistrationRequest] =
    useState<RegistrationRequest | null>(null);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { intl } = useLocales();
  const { metamaskProvider, metamaskWalletAddress } = useMetamask();
  const address = fdpClientRef.current.account.wallet?.address;

  const timer = useRef<NodeJS.Timeout | null>();

  const checkMinBalance = async () => {
    try {
      const { address } = fdpClientRef.current.account.wallet;

      const balance = await getAccountBalance(address, network);

      const canProceed = balance.gte(minBalance);

      setCanProceed(canProceed);

      if (canProceed) {
        closeTimer();
      }
    } catch (error) {
      console.error(error);
      closeTimer();
      setBalanceError(String(error));
      setCanProceed(true);
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      let request = registrationRequest;

      if (
        !request ||
        request?.username !== username ||
        request?.password !== password
      ) {
        request = fdpClientRef.current.account.createRegistrationRequest(
          username,
          password
        );
        setRegistrationRequest(request);
      }

      await fdpClientRef.current.account.register(request);
      setWallet(fdpClientRef.current.account.wallet);
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
    try {
      setSending(true);
      await switchToNetwork(
        metamaskProvider,
        '0x' + network.chainId.toString(16)
      );
      await sendAmount(
        metamaskProvider,
        metamaskWalletAddress,
        address,
        utils.formatEther(minBalance)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const getFeePrice = async () => {
    const price = await estimateRegistrationPrice(network);

    setMinBalance(price);
  };

  const closeTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const initialize = async () => {
    try {
      fdpClientRef.current.account.setAccountFromMnemonic(mnemonic);
      await getFeePrice();
    } catch (error) {
      console.error(error);
      setBalanceError(String(error));
      setCanProceed(true);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    closeTimer();

    if (!minBalance || canProceed) {
      return;
    }

    checkMinBalance();
    timer.current = setInterval(checkMinBalance, 10000);

    return closeTimer;
  }, [minBalance, canProceed, checkMinBalance]);

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
                {intl.get('YOUR_ACCOUNT_IS')} <br />
                <span>
                  {address}
                  <CopyButton text={address} />
                </span>
              </div>
              <div>{intl.get('CHECK_FUNDS_BEFORE_REGISTRATION')}</div>
              <div className="py-3">
                {minBalance
                  ? intl.get('ESTIMATED_MINIMAL_BALANCE_IS', {
                      balance: utils.formatEther(minBalance),
                    })
                  : intl.get('GAS_ESTIMATION_CANT_BE_PERFORMED')}
                <div>
                  <div className="has-tooltip inline-block pt-1 text-color-shade-dark-2-night dark:text-color-shade-light-2-night cursor-pointer">
                    <span>
                      {theme === 'light' ? <InfoLight /> : <InfoDark />}
                    </span>
                    <span className="tooltip rounded w-96 left-0 bottom-8 shadow-lg p-3 bg-color-shade-dark-2-day dark:bg-color-shade-dark-2-night">
                      {intl.get('NETWORK_UNRELIABILITY_EXPLANATION')}
                      <ul>
                        <li>{intl.get('ENS_REGISTRATION')}</li>
                        <li>{intl.get('SET_ENS_RESOLVER')}</li>
                        <li>{intl.get('PUBLIC_KEY_REGISTRATION')}</li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>{intl.get('ESTIMATING_TRANSACTION_FEE_PRICE')}</>
          )}
        </div>
      </div>

      {errorMessage && <FeedbackMessage type="error" message={errorMessage} />}

      {initialized &&
        (canProceed && !balanceError ? (
          <div className="text-color-status-positive-day bold">
            {intl.get('FUNDS_SUFFICIENT')}
          </div>
        ) : (
          <div className="mt-5">
            {minBalance && (
              <>
                {balanceError && (
                  <div className="text-sm mb-2">
                    {intl.get('COULD_NOT_CHECK_YOUR_BALANCE')}
                  </div>
                )}

                <Button
                  variant="tertiary-outlined"
                  label={intl.get('SEND_MINIMAL_BALANCE')}
                  disabled={loading || sending}
                  loading={sending}
                  onClick={send}
                />
              </>
            )}
          </div>
        ))}

      <div className="mt-5">
        {initialized && (
          <Button
            variant="primary-outlined"
            label={loading ? 'Registering' : 'Continue registration'}
            disabled={!canProceed || loading}
            loading={loading}
            onClick={register}
          />
        )}
      </div>
    </>
  );
}
