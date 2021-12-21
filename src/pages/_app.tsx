import { AppProps } from 'next/app';

import { ThemeProvider } from '@context/ThemeContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';
import { UserProvider } from '@context/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <PodProvider>
          <Component {...pageProps} />
        </PodProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
