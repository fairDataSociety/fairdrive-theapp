/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage/dist/index.browser.min';
import { BigNumber, providers, Wallet } from 'ethers';
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';

let fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_MAINNET_BEE_URL,
  // eslint-disable-next-line
  process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
  {
    ensOptions: {
      performChecks: true,
      rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
      contractAddresses: {
        ensRegistry: process.env.NEXT_PUBLIC_MAINNET_ENS_REGISTRY_ADDRESS,
        publicResolver: process.env.NEXT_PUBLIC_MAINNET_PUBLIC_RESOLVER_ADDRESS,
        fdsRegistrar:
          process.env.NEXT_PUBLIC_MAINNET_SUBDOMAIN_REGISTRAR_ADDRESS,
      },
    },
    ensDomain: 'fds',
  }
);

const provider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL as string
);

interface FdpStorageContextProps {
  children: ReactNode;
}

interface FdpStorageContext {
  fdpClient: FdpStorage;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
  getAccountBalance: (address: string) => Promise<BigNumber>;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClient,
  username: '',
  setUsername: null,
  password: '',
  setPassword: null,
  wallet: null,
  setWallet: null,
  isUsernameAvailable: () => Promise.resolve(false),
  getAccountBalance: () => Promise.resolve(BigNumber.from(0)),
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wallet, setWallet] = useState<Wallet>(null);

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      const parsed = parseUrl(url);
      if (!parsed.query.network) return;
      const network =
        (parsed.query.network as string).toUpperCase() || 'MAINNET';

      // TODO: process.env is not an object... need to find a better solution
      if (network === 'MAINNET') {
        fdpClient = new FdpStorage(
          process.env.NEXT_PUBLIC_MAINNET_BEE_URL,
          // eslint-disable-next-line
          process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
          {
            ensOptions: {
              performChecks: true,
              rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
              contractAddresses: {
                ensRegistry:
                  process.env.NEXT_PUBLIC_MAINNET_ENS_REGISTRY_ADDRESS,
                publicResolver:
                  process.env.NEXT_PUBLIC_MAINNET_PUBLIC_RESOLVER_ADDRESS,
                fdsRegistrar:
                  process.env.NEXT_PUBLIC_MAINNET_SUBDOMAIN_REGISTRAR_ADDRESS,
              },
            },
            ensDomain: 'fds',
          }
        );
      } else if (network === 'TESTNET') {
        fdpClient = new FdpStorage(
          process.env.NEXT_PUBLIC_TESTNET_BEE_URL,
          // eslint-disable-next-line
          process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
          {
            ensOptions: {
              performChecks: true,
              rpcUrl: process.env.NEXT_PUBLIC_TESTNET_RPC_URL,
              contractAddresses: {
                ensRegistry:
                  process.env.NEXT_PUBLIC_TESTNET_ENS_REGISTRY_ADDRESS,
                publicResolver:
                  process.env.NEXT_PUBLIC_TESTNET_PUBLIC_RESOLVER_ADDRESS,
                fdsRegistrar:
                  process.env.NEXT_PUBLIC_TESTNET_SUBDOMAIN_REGISTRAR_ADDRESS,
              },
            },
            ensDomain: 'fds',
          }
        );
      } else {
        fdpClient = new FdpStorage(
          process.env.NEXT_PUBLIC_LOCALNET_BEE_URL,
          // eslint-disable-next-line
          process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
          {
            ensOptions: {
              performChecks: true,
              rpcUrl: process.env.NEXT_PUBLIC_LOCALNET_RPC_URL,
              contractAddresses: {
                ensRegistry:
                  process.env.NEXT_PUBLIC_LOCALNET_ENS_REGISTRY_ADDRESS,
                publicResolver:
                  process.env.NEXT_PUBLIC_LOCALNET_PUBLIC_RESOLVER_ADDRESS,
                fdsRegistrar:
                  process.env.NEXT_PUBLIC_LOCALNET_SUBDOMAIN_REGISTRAR_ADDRESS,
              },
            },
            ensDomain: 'fds',
          }
        );
      }
    });
  }, [router]);

  const isUsernameAvailable = async (
    username: string
  ): Promise<boolean | string> => {
    try {
      const isAvailable = await fdpClient.ens.isUsernameAvailable(username);
      return isAvailable ? true : 'Oops, username is already taken';
    } catch (error) {
      return error.message;
    }
  };

  const getAccountBalance = (address: string) => {
    return provider.getBalance(address);
  };

  return (
    <FdpStorageContext.Provider
      value={{
        fdpClient,
        username,
        setUsername,
        password,
        setPassword,
        wallet,
        setWallet,
        isUsernameAvailable,
        getAccountBalance,
      }}
    >
      {children}
    </FdpStorageContext.Provider>
  );
}

function useFdpStorage() {
  return useContext(FdpStorageContext);
}

export default FdpStorageContext;
export { FdpStorageProvider, useFdpStorage };
