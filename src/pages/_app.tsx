import { AppProps } from 'next/app';

import Matomo from '@context/Matomo';
import { ThemeProvider } from '@context/ThemeContext';
import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';
import { FdpStorageProvider } from '@context/FdpStorageContext';
/* eslint-disable no-console */
import { BeeDebug, DebugPostageBatch } from '@ethersphere/bee-js';
import { useEffect } from 'react';

async function sleep(ms = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async function testsSetup(): Promise<void> {
//   if (!process.env.BEE_POSTAGE) {
//     try {
//       const beeDebugUrl = process.env.NEXT_PUBLIC_BEE_DEBUG_URL;
//       const beeDebug = new BeeDebug(beeDebugUrl);
//       const postageBatch = await beeDebug.getPostageBatch(
//         process.env.NEXT_PUBLIC_POSTAGE_STAMP
//       );

//       // if (postageBatch) {
//       //   const pB = await beeDebug.createPostageBatch('1', 20);
//       //   console.log(pB);
//       // }
//     } catch (e) {
//       // It is possible that for unit tests the Bee nodes does not run
//       // so we are only logging errors and not leaving them to propagate
//       console.error(e);
//     }
//   }
// }

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   testsSetup();
  // }, []);

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
