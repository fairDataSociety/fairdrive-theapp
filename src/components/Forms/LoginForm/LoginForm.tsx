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
        heading="Welcome back"
        text="Please log in to get acess to your Fairdrive."
      />

      <div className="w-98 mt-16">
        <form action="" autoComplete="off" className="w-full">
          <AuthenticationInput
            label="username"
            id="username"
            type="text"
            name="username"
          />
          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
          />

          <Button text="Continue" />

          <Link href="/register">
            <a className="inline-block my-5">Register New Account</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
