import { FC } from 'react';
import router from 'next/router';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

const RegisterForm: FC = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data: { user_name: string; password: string }) => {
    localStorage.setItem('registerUser', JSON.stringify(data));
    router.push('/register/seed');
  };

  return (
    <div className="flex flex-col justify-center items-center">
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
          />

          <div className="mt-14 text-center">
            <Button type="submit" variant="secondary" label="Create account" />
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
