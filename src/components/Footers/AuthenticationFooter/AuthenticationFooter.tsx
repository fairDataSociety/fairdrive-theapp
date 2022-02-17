import { FC } from 'react';
import Link from 'next/link';

const AuthenticationFooter: FC = () => {
  return (
    <div className="flex justify-evenly items-center w-full h-16 bg-white shadow-top">
      <Link href="/privacy-policy">
        <a className="font-medium text-base text-color-accents-purple-black dark:text-color-accents-soft-lavender leading-6">
          Privacy Policy
        </a>
      </Link>
      <Link href="/terms">
        <a className="font-medium text-base text-color-accents-purple-black dark:text-color-accents-soft-lavender leading-6">
          Terms & Conditions
        </a>
      </Link>
    </div>
  );
};

export default AuthenticationFooter;
