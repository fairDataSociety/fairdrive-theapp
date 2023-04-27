# Fairdrive v0.2.0

Where innovation, interoperability and decentralization unite in the name of fair data.
Fairdrive is a community-driven initiative with the mission to empower freedom. By enabling decentralized storage, developers can create and build interoperable, decentralized and open-sourced dApps so users can reclaim their privacy, own their data and control their digital identity.

## What is Fairdrive

Fairdrive is a dApp that enables decentralized storage on Swarm. It consists of a typical "Drive" interface with files and folders, and a BZZ wallet to manage token balances and keypairs. Under the hood, FairOS is running a filesystem on top of Ethereum Swarm. Fairdrive Protocol is used to communicate with FairOS.

## How does it work

Fairdrive works very similar to Google Drive or Dropbox, yet with some big differences:

- Data is encrypted out of the box
- Data is owned by the user only
- Data is stored on a decentralized Incentivised network
- Only the user has access to this data and thus controls how data is used
- The user gets the revenue of their data

## Development

Please install `fdp-play`, be sure to use Node 16 and have Docker environment setup and verify that ports 3000, 1633, 1634, 1635 are available.
Testnet deployment : http://app.fairdrive.dev.fairdatasociety.org/

- `npm i -g @fairdatasociety/fdp-play`
- `fdp-play start --fresh`

## Post installation steps

### Postage batch initialization

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

### Latest Goerli contract configuration

If you would like to use Goerli, in this [file](https://github.com/fairDataSociety/fdp-contracts/blob/master/js-library/src/contracts/contracts-goerli.env) you can find the respective contract addresses. To override the default configuration, use this:

```typescript
// FdpStorageContext.tsx

/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage';
import { BigNumber, providers, Wallet } from 'ethers';

const provider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL as string
);

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL,
  {
    ensOptions: {
      performChecks: true,
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
      contractAddresses: {
        ensRegistry: process.env.NEXT_PUBLIC_ENS_REGISTRY_ADDRESS,
        publicResolver: process.env.NEXT_PUBLIC_PUBLIC_RESOLVER_ADDRESS,
        fdsRegistrar: process.env.NEXT_PUBLIC_SUBDOMAIN_REGISTRAR_ADDRESS,
      },
    },
    ensDomain: 'fds',
  }
);
```

## Running in development mode

Install dependencies:

```bash
yarn
```

Or:

```bash
npm ci
```

And run the application:

```bash
yarn start
```

Or:

```bash
npm start
```

To change the configuration, edit the `.env` file.

## Check it out

Mainnet deployment: https://app.fairdrive.fairdatasociety.org
