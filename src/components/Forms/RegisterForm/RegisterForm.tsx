import { FC } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

const RegisterForm: FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    localStorage.setItem('registerDetails', JSON.stringify(data));
    router.push('/register/seed');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        heading="Register your account"
        text="Welcome to Fairdrive, please complete the form below to get started."
      />

      <div className="w-98 mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="username"
            id="username"
            type="text"
            name="username"
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
            <Button variant="secondary" type="submit" text="Create account" />
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
