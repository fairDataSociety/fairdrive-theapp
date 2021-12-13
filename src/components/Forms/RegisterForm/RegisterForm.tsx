import { FC } from 'react';
import Link from 'next/link';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        heading="Register your account"
        text="Welcome to Fairdrive, please complete the form below to get started."
      />

      <div className="w-98 mt-12">
        <form action="" autoComplete="off" className="w-full">
          <AuthenticationInput
            label="username"
            id="username"
            type="text"
            name="username"
            placeholder="Type here"
          />
          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
          />

          <div className="mt-14 text-center">
            <Button variant="secondary" text="Create account" />
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

export default LoginForm;
