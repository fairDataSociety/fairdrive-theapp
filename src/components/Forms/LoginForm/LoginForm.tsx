import { FC, useContext, useState } from 'react';
import router from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import UserContext from '@context/UserContext';
import PodContext from '@context/PodContext';

import { login, userStats } from '@api/authentication';

import DisclaimerMessage from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';

const LoginForm: FC = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const { setUser, setPassword, setAddress } = useContext(UserContext);
  const { clearPodContext } = useContext(PodContext);

  const [errorMessage, setErrorMessage] = useState('');

  const { fdpClient, isUsernameAvailable } = useFdpStorage();

  const onSubmit = async (data: { user_name: string; password: string }) => {
    try {
      const { user_name, password } = data;
      const wallet = await fdpClient.account.login(user_name, password);

      fdpClient.account.setActiveAccount(wallet);
      console.log(wallet);
      router.push('/overview');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }

    // login(data)
    //   .then(() => {
    //     setUser(data.user_name);
    //     setPassword(data.password);

    //     userStats()
    //       .then((res) => {
    //         setAddress(res.data.reference);
    //         clearPodContext();
    //         router.push('/overview');
    //       })
    //       .catch(() => {
    //         setErrorMessage(
    //           'Login failed. Incorrect user credentials, please try again.'
    //         );
    //       });
    //   })
    //   .catch(() => {
    //     setErrorMessage(
    //       'Login failed. Incorrect user credentials, please try again.'
    //     );
    //   });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <DisclaimerMessage />

      <AuthenticationHeader
        title="Welcome back"
        content="Please log in to get access to your Fairdrive."
      />

      <div className="w-98 mt-12">
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
              validate: async (value: string) => {
                const userNameAvailable = await isUsernameAvailable(value);
                return userNameAvailable;
              },
            }}
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
            error={errors.password}
          />

          <div className="mt-14 text-center">
            <Button
              disabled={!isValid}
              type="submit"
              variant="secondary"
              label="Continue"
            />
          </div>

          <div className="my-6 text-center">
            <Link href="/register">
              <a className="font-normal text-xs text-color-accents-purple-black dark:text-color-accents-grey-lavendar">
                Register New Account
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
