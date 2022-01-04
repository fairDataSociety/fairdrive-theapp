import { AppProps } from 'next/app';

import { ThemeProvider } from '@context/ThemeContext';
import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <SearchProvider>
          <PodProvider>
            <Component {...pageProps} />
          </PodProvider>
        </SearchProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
