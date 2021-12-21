import { FC } from 'react';

import Logo from '@components/Logo/Logo';
import { Button, ThemeToggle } from '@components/Buttons';
import Download from '@media/UI/download.svg';
import Link from 'next/link';

const AuthenticationNavbar: FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
      <Logo />
      <div className="flex justify-between ">
        <Link href="/import-user">
          <a className=" pr-2">
            <Button
              variant="tertiary-outlined"
              label="Import Account"
              icon={Download}
            ></Button>
          </a>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
