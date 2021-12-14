import { FC, useState } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { login } from '@api/authentication';

import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

const LoginForm: FC = () => {
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data: any) => {
    login(data)
      .then(() => {
        router.push('/overview');
      })
      .catch(() => {
        setErrorMessage(
          'Login failed. Incorrect user credentials, please try again.'
        );
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        heading="Welcome back"
        text="Please log in to get access to your Fairdrive."
      />

      <div className="w-98 mt-12">
        <div className="mb-5 text-center">
          <FeedbackMessage message={errorMessage} success={false} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="username"
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Type here"
            useFormRegister={register}
          />
          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            useFormRegister={register}
          />

          <div className="mt-14 text-center">
            <Button variant="secondary" type="submit" text="Continue" />
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
