import { FC } from 'react';
import Link from 'next/link';

const AuthenticationFooter: FC = () => {
  return (
    <div className="flex justify-evenly items-center w-full h-16 bg-white shadow-top ">
      <Link href="/privacy-policy">
        <a className="">Privacy Policy</a>
      </Link>
      <Link href="/terms">
        <a className="">Terms & Conditions</a>
      </Link>
    </div>
  );
};

export default AuthenticationFooter;
