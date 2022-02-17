import { AppProps } from 'next/app';

import Matomo from '@context/Matomo';
import { ThemeProvider } from '@context/ThemeContext';
import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
