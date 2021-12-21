import { FC, useContext, useState } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { login, userStats } from '@api/authentication';

import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import UserContext from '@context/UserContext';

const LoginForm: FC = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { setUser, setPassword, setAddress } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data: { user_name: string; password: string }) => {
    login(data)
      .then(() => {
        setPassword(data.password);
        setUser(data.user_name);
        userStats()
          .then((res) => {
            setAddress(res.data.reference);
          })
          .catch(() => {
            setErrorMessage(
              'Login failed. Incorrect user credentials, please try again.'
            );
          });
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
              required: true,
            }}
            error={errors.user_name}
            errorMessage="Username or e-mail is required"
          />

          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.password}
            errorMessage="Password is required"
          />

          <div className="mt-14 text-center">
            <Button type="submit" variant="secondary" label="Continue" />
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
