### Goerli contract configuration

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