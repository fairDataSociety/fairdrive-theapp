import { FC, ReactChild, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { AuthenticationNavbar } from '@components/NavigationBars';
import { AuthenticationFooter } from '@components/Footers';

interface AuthenticationLayoutProps {
  children: ReactChild | ReactChild[];
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex justify-items-stretch w-screen h-screen dark:bg-color-shade-dark-3-night">
      <div className={`w-100 bg-auth-${theme} bg-center bg-cover bg-no-repeat`}>
        {/* Authentication Background Image */}
      </div>

      <div className="flex flex-col justify-between items-center w-full bg-white">
        <div className="w-full h-16">
          <AuthenticationNavbar />
        </div>
        <div className="w-full pt-16 overflow-scroll no-scroll-bar">
          {children}
        </div>
        <div className="w-full h-16">
          <AuthenticationFooter />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
