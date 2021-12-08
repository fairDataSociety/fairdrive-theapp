import { AppProps } from 'next/app';

import { ThemeProvider } from '@context/ThemeContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
