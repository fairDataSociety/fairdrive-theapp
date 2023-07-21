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
import { LocalStorageKeys } from '@utils/localStorage';

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
    fdpClient,
    setWallet,
    setIsLoggedIn,
    setFdpStorageType,
    setLoginType,
    storageType,
    setEnsConfig,
  } = useFdpStorage();
  const router = useRouter();

  const onSubmit = async (data: { user_name: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const { user_name, password } = data;
      const fdpClient = setEnsConfig(network.config);
      const wallet = await fdpClient.account.login(user_name, password);
      setWallet(wallet);
      setFdpStorageType('native');
      setIsLoggedIn(true);
      setLoginType('username');
      setUser(user_name);
      localStorage.setItem(LocalStorageKeys.NETWORK, String(network.id));
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

    // init the FDP cache if is not initialized yet
    if (fdpClient?.cache?.object && isEmpty(fdpClient.cache.object)) {
      fdpClient.cache.object = JSON.parse(getCache(CacheType.FDP));
    }
  }, [fdpClient.cache, storageType]);

  return (
    <div className="flex flex-col px-3 justify-center items-center">
      <DisclaimerMessage
        icon={IconType.WARNING}
        text="Fairdrive is in Beta and provided for evaluation only! File integrity
      persistence and security are not assured! Expect that data in Fairdrive
      can be deleted at any time."
      />

      <AuthenticationHeader
        title="Welcome back"
        content="Please log in to get access to your Fairdrive."
      />

      <div className="w-full md:w-98 mt-4">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label className="font-normal text-base text-color-accents-plum-black dark:text-color-accents-grey-pastel">
            Choose network:
          </label>
          <NetworkDropdown
            className="mb-3"
            value={network}
            onChange={onNetworkChange}
          />

          <AuthenticationInput
            label="username"
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: 'Username is required',
              minLength: {
                value: 4,
                message:
                  'Username field needs to contain at least 4 characters',
              },
            }}
            // @ts-ignore
            error={errors.user_name}
          />

          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: 'Password is required',
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
              label="Continue"
            />
          </div>

          <div className="my-6 text-center">
            <a
              href={CREATE_USER_URL}
              target={'_blank'}
              rel="noopener noreferrer"
              className="font-normal text-xs text-color-accents-purple-black dark:text-color-accents-grey-lavendar"
            >
              Register New Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
