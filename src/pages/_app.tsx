import { AppProps } from 'next/app';

import Matomo from '@context/Matomo';
import { ThemeProvider } from '@context/ThemeContext';
import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';
import { FdpStorageProvider } from '@context/FdpStorageContext';
/* eslint-disable no-console */

/**
 * This is a helper function to create or get the postage batch stamp. Once gotten
 * it is included in the env file so the app can use it
 */

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
  return (
    <Matomo>
      <ThemeProvider>
        <UserProvider>
          <FdpStorageProvider>
            <SearchProvider>
              <PodProvider>
                <Component {...pageProps} />
              </PodProvider>
            </SearchProvider>
          </FdpStorageProvider>
        </UserProvider>
      </ThemeProvider>
    </Matomo>
  );
}

export default MyApp;
