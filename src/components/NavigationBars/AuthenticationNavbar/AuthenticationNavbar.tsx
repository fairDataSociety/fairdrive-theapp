import { FC } from 'react';
import Link from 'next/link';

import Logo from '@components/Logo/Logo';
import { Button, ThemeToggle } from '@components/Buttons';

import DownloadIcon from '@media/UI/download.svg';

const AuthenticationNavbar: FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
      <Logo />

      <div className="flex justify-between items-center">
        <Link href="/import">
          <a className="mr-6">
            <Button
              variant="tertiary-outlined"
              label="Import Account"
              icon={<DownloadIcon className="inline-block ml-2" />}
            />
          </a>
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
