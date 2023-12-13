import { FC } from 'react';
import Link from 'next/link';
import Logo from '@components/Logo/Logo';
import { Button, ThemeToggle } from '@components/Buttons';
import DownloadIcon from '@media/UI/download.svg';

import ConnectDropdown from '@components/Dropdowns/ConnectDropdown/ConnectDropdown';

import classes from './AuthenticationNavbar.module.scss';
import { useLocales } from '@context/LocalesContext';
import LanguageDropdown from '@components/Dropdowns/LanguageDropdown/LanguageDropdown';
import { useRouter } from 'next/router';

const AuthenticationNavbar: FC = () => {
  const { intl } = useLocales();
  const router = useRouter();
  const fdsLoginEnabled = router?.query['fdsLogin'] === 'true';

  return (
    <div
      className={`${classes.wrapper} flex justify-between items-center w-full h-16 px-6 shadow-lg`}
    >
      <Logo />

      <div className="flex justify-between items-center">
        {fdsLoginEnabled && (
          <a className={`${classes.button} mr-4`}>
            <ConnectDropdown />
          </a>
        )}

        <ThemeToggle />

        <div className="ml-2">
          <LanguageDropdown />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
