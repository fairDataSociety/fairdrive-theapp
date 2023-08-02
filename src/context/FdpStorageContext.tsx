/* eslint-disable @typescript-eslint/no-empty-function */
import { FdpStorage } from '@fairdatasociety/fdp-storage/dist/index.browser.min';
import { Wallet } from 'ethers';
import { CacheType, saveCache } from '@utils/cache';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Blossom } from '@fairdatasociety/blossom';
import { FdpContracts } from '@fairdatasociety/fdp-storage';
import { networks } from '@data/networks';
import { LocalStorageKeys } from '@utils/localStorage';

type FDP_STORAGE_TYPE = 'native' | 'blossom';
export const BLOSSOM_DEFAULT_ADDRESS = '[Blossom user]';
export type LoginType = 'username' | 'blossom' | 'metamask';

const createFdpStorage = (
  ensOptions: FdpContracts.EnsEnvironment
): FdpStorage => {
  return new FdpStorage(
    process.env.NEXT_PUBLIC_BEE_URL,
    (process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null) as any,
    {
      ensOptions,
      ensDomain: 'fds',
      cacheOptions: {
        isUseCache: true,
        onSaveCache: async (cacheObject) => {
          saveCache(CacheType.FDP, JSON.stringify(cacheObject));
        },
      },
    }
  );
};

export const getDefaultNetwork = () => {
  let defaultNetworkId;

  if (typeof window !== 'undefined') {
    defaultNetworkId = localStorage.getItem(LocalStorageKeys.NETWORK);
  }

  return (
    networks.find(({ id }) => String(id) === defaultNetworkId) || networks[0]
  );
};

interface FdpStorageContextProps {
  children: ReactNode;
}

interface FdpStorageContext {
  fdpClientRef: MutableRefObject<FdpStorage>;
  username: string;
  password: string;
  isLoggedIn: boolean;
  loginType: LoginType | null;
  blossom: Blossom;
  wallet: Wallet | null;
  storageType: FDP_STORAGE_TYPE | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setLoginType: (loginType: LoginType) => void;
  setWallet: (wallet: Wallet) => void;
  setFdpStorageType: (
    type: FDP_STORAGE_TYPE,
    config?: FdpContracts.EnsEnvironment
  ) => void;
  setFdpStorageConfig: (config: FdpContracts.EnsEnvironment) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
  getAccountAddress: () => Promise<string>;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClientRef: { current: null },
  username: '',
  password: '',
  isLoggedIn: false,
  loginType: null,
  setUsername: null,
  setPassword: null,
  blossom: null,
  wallet: null,
  storageType: null,
  setWallet: null,
  setIsLoggedIn: null,
  setLoginType: null,
  setFdpStorageType: () => {},
  setFdpStorageConfig: () => {},
  isUsernameAvailable: () => Promise.resolve(false),
  getAccountAddress: () => Promise.resolve(undefined),
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [blossom, setBlossom] = useState<Blossom>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wallet, setWallet] = useState<Wallet>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<LoginType | null>(null);
  const [storageType, setStorageType] = useState<FDP_STORAGE_TYPE>(null);
  const fdpClientRef = useRef<FdpStorage>(
    createFdpStorage(getDefaultNetwork().config)
  );

  const isUsernameAvailable = async (
    username: string
  ): Promise<boolean | string> => {
    try {
      const isAvailable = await fdpClientRef.current.ens.isUsernameAvailable(
        username
      );
      return isAvailable ? true : 'Oops, username is already taken';
    } catch (error) {
      return error.message;
    }
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
      return fdpClientRef.current.account.wallet.address;
    }
  };

  const setFdpStorageConfig = (config: FdpContracts.EnsEnvironment) => {
    if (storageType !== 'native') {
      throw new Error('Invalid storage type');
    }

    fdpClientRef.current = createFdpStorage(config);
  };

  /**
   * Sets the FDP storage type
   */
  const setFdpStorageType = (
    type: FDP_STORAGE_TYPE,
    config?: FdpContracts.EnsEnvironment
  ) => {
    if (type === 'native') {
      fdpClientRef.current = createFdpStorage(config);
    } else if (type === 'blossom') {
      fdpClientRef.current = blossom.fdpStorage;
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
        fdpClientRef,
        username,
        password,
        isLoggedIn,
        loginType,
        blossom,
        wallet,
        storageType,
        setWallet,
        setIsLoggedIn,
        setLoginType,
        setFdpStorageType,
        setFdpStorageConfig,
        setUsername,
        setPassword,
        isUsernameAvailable,
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
