import { FC } from 'react';

import Logo from '@components/Logo/Logo';
import { ThemeToggle } from '@components/Buttons';

const AuthenticationNavbar: FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
      <Logo />
      <ThemeToggle />
    </div>
  );
};

export default AuthenticationNavbar;
