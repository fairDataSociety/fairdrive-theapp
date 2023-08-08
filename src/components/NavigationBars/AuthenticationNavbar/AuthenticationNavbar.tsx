import { FC } from 'react';
import Link from 'next/link';
import Logo from '@components/Logo/Logo';
import { Button, ThemeToggle } from '@components/Buttons';
import DownloadIcon from '@media/UI/download.svg';

import ConnectDropdown from '@components/Dropdowns/ConnectDropdown/ConnectDropdown';

import classes from './AuthenticationNavbar.module.scss';
import { useLocales } from '@context/LocalesContext';

const AuthenticationNavbar: FC = () => {
  const { intl } = useLocales();

  return (
    <div
      className={`${classes.wrapper} flex justify-between items-center w-full h-16 px-6 shadow-lg`}
    >
      <Logo />

      <div className="flex justify-between items-center">
        <Link href="/import">
          <a className={`${classes.button} mr-6`}>
            <Button
              variant="tertiary-outlined"
              label={intl.get('IMPORT_ACCOUNT')}
              icon={<DownloadIcon className="inline-block ml-2" />}
            />
          </a>
        </Link>

        <a className={`${classes.button} mr-6`}>
          <ConnectDropdown />
        </a>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
