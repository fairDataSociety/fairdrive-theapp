/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import UserContext from '@context/UserContext';
import DisclaimerMessage, {
  IconType,
} from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { getDefaultNetwork, useFdpStorage } from '@context/FdpStorageContext';
import { isEmpty } from '@utils/object';
import { CacheType, getCache } from '@utils/cache';
import { Network } from '@data/networks';
import NetworkDropdown from '@components/Dropdowns/NetworkDropdown/NetworkDropdown';
import { setDefaultNetwork } from '@utils/localStorage';
import { useLocales } from '@context/LocalesContext';

const LoginForm: FC = () => {
  const CREATE_USER_URL = process.env.NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT;
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const { setUser, errorMessage, setErrorMessage } = useContext(UserContext);
  const [network, setNetwork] = useState<Network>(getDefaultNetwork());
  const [loading, setLoading] = useState<boolean>(false);

  const {
    fdpClientRef,
    setWallet,
    setIsLoggedIn,
    setFdpStorageType,
    setLoginType,
    storageType,
  } = useFdpStorage();
  const router = useRouter();
  const { intl } = useLocales();

  const onSubmit = async (data: { user_name: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const { user_name, password } = data;
      setFdpStorageType('native', network.config);
      const wallet = await fdpClientRef.current.account.login(
        user_name,
        password
      );
      setWallet(wallet);
      setIsLoggedIn(true);
      setLoginType('username');
      setUser(user_name);
      setDefaultNetwork(String(network.id));
      router.push('/overview');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onNetworkChange = (network: Network) => {
    setNetwork(network);
  };

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  /**
   * Pods cache filling
   *
   * Works only with native fdp-storage
   */
  useEffect(() => {
    // cache initialization after browser context is available (Next.js related)
    if (storageType !== 'native') {
      return;
    }

    const fdpClient = fdpClientRef.current;

    // init the FDP cache if is not initialized yet
    if (fdpClient?.cache?.object && isEmpty(fdpClient.cache.object)) {
      fdpClient.cache.object = JSON.parse(getCache(CacheType.FDP));
    }
  }, [fdpClientRef.current?.cache, storageType]);

  const disclaimerMessages = [intl.get('DISCLAIMER')];
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PRODUCTION') {
    disclaimerMessages.push(intl.get('DISCLAIMER_DEV'));
  }

  return (
    <div className="flex flex-col px-3 justify-center items-center">
      <DisclaimerMessage
        icon={IconType.WARNING}
        text={disclaimerMessages.join(' ')}
      />

      <AuthenticationHeader
        title={intl.get('WELCOME_BACK')}
        content={intl.get('LOG_IN_TO_GET_ACCESS')}
      />

      <div className="w-full md:w-98 mt-4">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label className="font-normal text-base text-color-accents-plum-black dark:text-color-accents-grey-pastel">
            {intl.get('CHOOSE_NETWORK')}:
          </label>
          <NetworkDropdown
            className="mb-3"
            value={network}
            onChange={onNetworkChange}
          />

          <AuthenticationInput
            label={intl.get('USERNAME')}
            id="user_name"
            type="text"
            name="user_name"
            placeholder={intl.get('TYPE_HERE')}
            useFormRegister={register}
            validationRules={{
              required: intl.get('USERNAME_IS_REQUIRED'),
              minLength: {
                value: 4,
                message: intl.get('USERNAME_MIN_LENGTH_ERROR'),
              },
            }}
            // @ts-ignore
            error={errors.user_name}
          />

          <AuthenticationInput
            label={intl.get('PASSWORD')}
            id="password"
            type="password"
            name="password"
            placeholder={intl.get('TYPE_HERE')}
            useFormRegister={register}
            validationRules={{
              required: intl.get('PASSWORD_IS_REQUIRED'),
            }}
            // @ts-ignore
            error={errors.password}
          />

          <div className="mt-8 text-center">
            <Button
              loading={loading}
              disabled={!isValid}
              type="submit"
              variant="secondary"
              label={intl.get('LOGIN')}
            />
          </div>

          <div className="my-6 text-center">
            <a
              href={CREATE_USER_URL}
              target={'_blank'}
              rel="noopener noreferrer"
              className="font-normal text-xs text-color-accents-purple-black dark:text-color-accents-grey-lavendar"
            >
              {intl.get('REGISTER_NEW_ACCOUNT')}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
