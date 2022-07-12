import { FC } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';

import DisclaimerMessage from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import { Wallet } from 'ethers';

const RegisterForm: FC = () => {
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  // using FDP Storage
  const { setUsername, setPassword, setMnemonic } = useFdpStorage();

  const onSubmit: SubmitHandler<{
    user_name: string;
    password: string;
  }> = async (data, event) => {
    event.stopPropagation();
    const { user_name, password } = data;
    // generate mnemonic
    const wallet = Wallet.createRandom();

    setUsername(user_name);
    setPassword(password);
    setMnemonic(wallet.mnemonic);

    router.push('/register/seed');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <DisclaimerMessage />

      <AuthenticationHeader
        title="Register your account"
        content="Welcome to Fairdrive, please complete the form below to get started."
      />

      <div className="w-98 mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="username"
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: 'Username or e-mail is required',
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
              required: 'Password field is required',
              minLength: {
                value: 8,
                message: 'Password field needs to contain at least 8 charcters',
              },
            }}
            error={errors.password}
          />

          <div className="mt-14 text-center">
            <Button
              disabled={!isValid}
              type="submit"
              variant="secondary"
              label="Create account"
            />
          </div>

          <div className="my-6 text-center">
            <Link href="/">
              <a className="font-normal text-xs text-color-accents-purple-black dark:text-color-accents-grey-lavendar">
                Already have an account?
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
