/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';

import DisclaimerMessage, {
  IconType,
} from '@components/DisclaimerMessage/DisclaimerMessage';
import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import { useFdpStorage } from '@context/FdpStorageContext';
import { Wallet } from 'ethers';
import { MIN_PASSWORD_LENGTH } from '@utils/password';
import { useLocales } from '@context/LocalesContext';

const RegisterForm: FC = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  // using FDP Storage
  const { setUsername, setPassword, setWallet, isUsernameAvailable } =
    useFdpStorage();
  const { intl } = useLocales();

  const onSubmit: SubmitHandler<{
    user_name: string;
    password: string;
  }> = async (data, event) => {
    event.stopPropagation();
    const { user_name, password } = data;

    const wallet = Wallet.createRandom();

    setUsername(user_name);
    setPassword(password);
    setWallet(wallet);

    router.push('/register/seed');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <DisclaimerMessage
        icon={IconType.WARNING}
        text={intl.get('DISCLAIMER_2')}
      />

      <AuthenticationHeader
        title={intl.get('REGISTER_YOUR_ACCOUNT')}
        content={intl.get('COMPLETE_THE_FORM_BELOW')}
      />

      <div className="w-98 mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
              validate: async (value: string) => {
                const userNameAvailable = await isUsernameAvailable(value);
                return userNameAvailable;
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
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: intl.get('PASSWORD_MIN_LENGTH_ERROR_2', {
                  length: String(MIN_PASSWORD_LENGTH),
                }),
              },
            }}
            // @ts-ignore
            error={errors.password}
          />

          <div className="mt-14 text-center">
            <Button
              disabled={!isValid}
              type="submit"
              variant="secondary"
              label={intl.get('CREATE_ACCOUNT')}
            />
          </div>

          <div className="my-6 text-center">
            <Link href="/">
              <a className="font-normal text-xs text-color-accents-purple-black dark:text-color-accents-grey-lavendar">
                {intl.get('ALREADY_HAVE_AN_ACCOUNT')}
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
