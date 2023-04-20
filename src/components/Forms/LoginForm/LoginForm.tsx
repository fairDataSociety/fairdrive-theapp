/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import UserContext from '@context/UserContext';
import DisclaimerMessage from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import { getCache } from '@utils/cache';
import { isEmpty } from '@utils/object';

const LoginForm: FC = () => {
  const CREATE_USER_URL = process.env.NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT;
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const { setUser, errorMessage, setErrorMessage } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);

  const { fdpClient, setWallet, setIsLoggedIn, setFdpStorageType } =
    useFdpStorage();
  const router = useRouter();

  const onSubmit = async (data: { user_name: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const { user_name, password } = data;
      const wallet = await fdpClient.account.login(user_name, password);
      setWallet(wallet);
      setFdpStorageType('native');
      setIsLoggedIn(true);
      setUser(user_name);
      router.push('/overview');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    // cache initialization after browser context is available (Next.js related)
    if (fdpClient.cache && isEmpty(fdpClient.cache.object)) {
      fdpClient.cache.object = JSON.parse(getCache());
    }
  }, [fdpClient.cache]);

  return (
    <div className="flex flex-col px-3 justify-center items-center">
      <DisclaimerMessage />

      <AuthenticationHeader
        title="Welcome back"
        content="Please log in to get access to your Fairdrive."
      />

      <div className="w-full md:w-98 mt-12">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

          <div className="mt-14 text-center">
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
