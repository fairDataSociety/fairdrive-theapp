/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';
import {
  AccountData,
  Directory,
  PersonalStorage,
  File,
  FdpStorage,
} from '@fairdatasociety/fdp-storage/dist/index.browser.min';
import { BigNumber, providers, Wallet } from 'ethers';
import UserContext from './UserContext';

const provider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL as string
);

interface FdpStorageContextProps {
  children: ReactNode;
}

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  // eslint-disable-next-line
  process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
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

interface FdpStorageContext {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
  getAccountBalance: (address: string) => Promise<BigNumber>;
  fdpClient: FdpStorage;
  setFdpClientBeeRpc: (beeUrl: string) => FdpStorage;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  username: '',
  setUsername: null,
  password: '',
  setPassword: null,
  wallet: null,
  setWallet: null,
  isUsernameAvailable: () => Promise.resolve(false),
  getAccountBalance: () => Promise.resolve(BigNumber.from(0)),
  fdpClient: FdpStorage,
  setFdpClientBeeRpc: () => FdpStorage,
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wallet, setWallet] = useState<Wallet>(null);

  const setFdpClientBeeRpc = (beeUrl: string) => {
    localStorage.setItem('beeUrl', beeUrl);
    const cloned = new FdpStorage(
      beeUrl || process.env.NEXT_PUBLIC_BEE_URL,
      // eslint-disable-next-line
      process.env.NEXT_PUBLIC_GLOBAL_BATCH_ID || null,
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

    fdpClient.connection = cloned.connection;
    fdpClient.account = new AccountData(cloned.connection, fdpClient.ens);
    fdpClient.personalStorage = new PersonalStorage(fdpClient.account);
    fdpClient.directory = new Directory(fdpClient.account);
    // fdpClient.file = new File(fdpClient.account);

    return fdpClient;
  };
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
        username,
        setUsername,
        password,
        setPassword,
        wallet,
        setWallet,
        isUsernameAvailable,
        getAccountBalance,
        fdpClient,
        setFdpClientBeeRpc,
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
