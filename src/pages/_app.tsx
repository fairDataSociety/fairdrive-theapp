import { AppProps } from 'next/app';

import Matomo from '@context/Matomo';
import { ThemeProvider } from '@context/ThemeContext';
import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';
import { FdpStorageProvider } from '@context/FdpStorageContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FdpStorageProvider>
      <Matomo>
        <ThemeProvider>
          <UserProvider>
            <SearchProvider>
              <PodProvider>
                <Component {...pageProps} />
              </PodProvider>
            </SearchProvider>
          </UserProvider>
        </ThemeProvider>
      </Matomo>
    </FdpStorageProvider>
  );
}

export default MyApp;
