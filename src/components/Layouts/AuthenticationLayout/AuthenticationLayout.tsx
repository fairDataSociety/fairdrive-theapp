import { FC, ReactChild } from 'react';

import { AuthenticationNavbar } from '@components/NavigationBars';
import { AuthenticationFooter } from '@components/Footers';

interface AuthenticationLayoutProps {
  children: ReactChild | ReactChild[];
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-items-stretch w-screen h-screen">
      <div className="w-100 bg-authentication bg-center bg-cover bg-no-repeat"></div>

      <div className="flex flex-col justify-between items-center w-full bg-white">
        <AuthenticationNavbar />
        <div className="flex-grow pt-16">{children}</div>
        <AuthenticationFooter />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
