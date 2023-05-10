/* eslint-disable @typescript-eslint/no-empty-function */
import { FdpStorage } from '@fairdatasociety/fdp-storage/dist/index.browser.min';
import { BigNumber, providers, Wallet } from 'ethers';
import { CacheType, saveCache } from '@utils/cache';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Blossom } from '@fairdatasociety/blossom';

type FDP_STORAGE_TYPE = 'native' | 'blossom';
export const BLOSSOM_DEFAULT_ADDRESS = '[Blossom user]';

const provider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL as string
);

const nativeFdpStorage = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  (process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null) as any,
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
    cacheOptions: {
      isUseCache: true,
      onSaveCache: async (cacheObject) => {
        saveCache(CacheType.FDP, JSON.stringify(cacheObject));
      },
    },
  }
);
interface FdpStorageContextProps {
  children: ReactNode;
}

interface FdpStorageContext {
  fdpClient: FdpStorage;
  username: string;
  password: string;
  isLoggedIn: boolean;
  blossom: Blossom;
  wallet: Wallet | null;
  storageType: FDP_STORAGE_TYPE | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setWallet: (wallet: Wallet) => void;
  setFdpStorageType: (type: FDP_STORAGE_TYPE) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
  getAccountBalance: (address: string) => Promise<BigNumber>;
  getAccountAddress: () => Promise<string>;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClient: null,
  username: '',
  password: '',
  isLoggedIn: false,
  setUsername: null,
  setPassword: null,
  blossom: null,
  wallet: null,
  storageType: null,
  setWallet: null,
  setIsLoggedIn: null,
  setFdpStorageType: () => {},
  isUsernameAvailable: () => Promise.resolve(false),
  getAccountBalance: () => Promise.resolve(BigNumber.from(0)),
  getAccountAddress: () => Promise.resolve(undefined),
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [blossom, setBlossom] = useState<Blossom>(null);
  const [fdpClient, setFdpClient] = useState<FdpStorage>(nativeFdpStorage);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wallet, setWallet] = useState<Wallet>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [storageType, setStorageType] = useState<FDP_STORAGE_TYPE>(null);

  const isUsernameAvailable = async (
    username: string
  ): Promise<boolean | string> => {
    try {
      const isAvailable = await nativeFdpStorage.ens.isUsernameAvailable(
        username
      );
      return isAvailable ? true : 'Oops, username is already taken';
    } catch (error) {
      return error.message;
    }
  };

  const getAccountBalance = (address: string) => {
    return provider.getBalance(address);
  };

  /**
   * Gets the account address
   *
   * Although the address is a synchronous field, it will become asynchronous in the future when working through an extension.
   */
  const getAccountAddress = async () => {
    // todo: should be replace with a correct user address after implementing https://github.com/fairDataSociety/blossom/issues/141
    if (storageType === 'blossom') {
      return BLOSSOM_DEFAULT_ADDRESS;
    } else {
      return fdpClient.account.wallet.address;
    }
  };

  /**
   * Sets the FDP storage type
   */
  const setFdpStorageType = (type: FDP_STORAGE_TYPE) => {
    if (type === 'native') {
      setFdpClient(nativeFdpStorage);
    } else if (type === 'blossom') {
      setFdpClient(blossom.fdpStorage);
    } else {
      throw new Error('Unknown FDP storage type');
    }
    setIsLoggedIn(false);
    setStorageType(type);
  };

  useEffect(() => {
    // Must be created on client side only
    setBlossom(new Blossom(process.env.NEXT_PUBLIC_BLOSSOM_ID));
  }, []);

  if (!blossom) {
    return null;
  }

  return (
    <FdpStorageContext.Provider
      value={{
        fdpClient,
        username,
        password,
        isLoggedIn,
        blossom,
        wallet,
        storageType,
        setWallet,
        setIsLoggedIn,
        setFdpStorageType,
        setUsername,
        setPassword,
        isUsernameAvailable,
        getAccountBalance,
        getAccountAddress,
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
