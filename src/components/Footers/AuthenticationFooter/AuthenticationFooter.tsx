import { FC } from 'react';
import Link from 'next/link';
import { useLocales } from '@context/LocalesContext';

const AuthenticationFooter: FC = () => {
  const { intl } = useLocales();

  return (
    <div className="flex justify-evenly items-center w-full h-16 bg-white shadow-top">
      <Link href="/privacy-policy">
        <a className="font-medium text-base text-color-accents-purple-black dark:text-color-accents-soft-lavender leading-6">
          {intl.get('PRIVACY_POLICY')}
        </a>
      </Link>
      <Link href="/terms">
        <a className="font-medium text-base text-color-accents-purple-black dark:text-color-accents-soft-lavender leading-6">
          {intl.get('TERMS_AND_CONDITIONS')}
        </a>
      </Link>
    </div>
  );
};

export default AuthenticationFooter;
