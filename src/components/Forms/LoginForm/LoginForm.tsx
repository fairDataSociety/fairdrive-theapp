/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import UserContext from '@context/UserContext';
import PodContext from '@context/PodContext';
import DisclaimerMessage from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { AuthenticationInput, Checkbox } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import { login } from '@api/user';

const LoginForm: FC = () => {
  const CREATE_USER_URL = process.env.NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT;
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const { setUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { fdpClient, setWallet } = useFdpStorage();
  const [logToFairos, setLogToFairos] = useState<boolean | undefined>(
    undefined
  );
  const router = useRouter();

  const onSubmit = async (data: { user_name: string; password: string }) => {
    try {
      setLoading(true);
      const { user_name, password } = data;
      const wallet = await fdpClient.account.login(user_name, password);
      setWallet(wallet);
      if (logToFairos) {
        await login(user_name, password);
      }
      setUser(user_name);
      router.push('/overview');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      setLogToFairos(router.query.fairos === 'true');
    }
  }, [router.isReady]);

  // It must wait for the router to be initialized
  if (logToFairos === undefined) {
    return null;
  }

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

          <div className="mt-14 text-center">
            <Checkbox
              name="fairos"
              label="Login with FairOS (this option will log you in to a remote server)"
              onChange={() => setLogToFairos(!logToFairos)}
              defaultValue={logToFairos}
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
