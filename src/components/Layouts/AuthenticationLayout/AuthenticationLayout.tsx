import { FC, ReactChild, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { AuthenticationNavbar } from '@components/NavigationBars';
import { AuthenticationFooter } from '@components/Footers';
import { BackButton } from '@components/Buttons';

interface AuthenticationLayoutProps {
  children: ReactChild | ReactChild[];
  hasBackButton?: boolean;
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = ({
  children,
  hasBackButton,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex md:pl-2 lg:pl-2 justify-items-stretch w-screen h-screen dark:bg-color-shade-dark-3-night">
      <div
        className={`w-0 sm:w-100 bg-auth-${theme} bg-center bg-cover bg-no-repeat`}
      >
        {/* Authentication Background Image */}
      </div>

      <div className="flex flex-col justify-between items-start w-full bg-white">
        <div className="w-full h-16">
          <AuthenticationNavbar />
        </div>

        {hasBackButton && (
          <div className="pt-8 pl-6">
            <BackButton />
          </div>
        )}

        <div className="w-full pt-8 overflow-scroll no-scroll-bar">
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
