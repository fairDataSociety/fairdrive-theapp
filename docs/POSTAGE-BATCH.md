## Postage batch initialization

Use this helper function and run it once to create a postage batch. This is only required anytime you create fdp-play docker containers from zero.

```typescript
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

async function testsSetup(): Promise<void> {
  if (!process.env.BEE_POSTAGE) {
    try {
      const beeDebugUrl = process.env.NEXT_PUBLIC_BEE_DEBUG_URL;
      const beeDebug = new BeeDebug(beeDebugUrl);
      const postageBatch = await beeDebug.getPostageBatch(
        process.env.NEXT_PUBLIC_POSTAGE_STAMP
      );

      if (postageBatch) {
        const pB = await beeDebug.createPostageBatch('1', 20);
      }
    } catch (e) {
      // It is possible that for unit tests the Bee nodes does not run
      // so we are only logging errors and not leaving them to propagate
      console.error(e);
    }
  }
}
```

## Getting Help

If you need help using Fairdrive, check out our [User Guide](USER-GUIDE.md) and [FAQ](FAQ.md). 
Start [here](GETTING-STARTED.md) or see [Design](DESIGN.md), [Functionality](FUNCTIONALITY.md) or [Architecture](ARCHITECTURE.md). 
Developers can check [Development Instructions](DEVELOPMENT.md).

If you can't find the answer to your question, feel free to [contact us](CONTACT.md).