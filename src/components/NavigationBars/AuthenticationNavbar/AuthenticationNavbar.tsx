import { FC } from 'react';

import Logo from '@media/branding/logo.svg';

const AuthenticationNavbar: FC = () => {
  return (
    <div className="flex justify-start items-center w-full h-16 pl-5 bg-white shadow-lg">
      <Logo />
    </div>
  );
};

export default AuthenticationNavbar;
