/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage';
import { BigNumber, providers, Wallet } from 'ethers';

const provider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL as string
);

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL
);

interface FdpStorageContextProps {
  children: ReactNode;
}

interface FdpStorageContext {
  fdpClient: FdpStorage;
  username: string | null;
  setUsername: (username: string) => void;
  password: string | null;
  setPassword: (password: string) => void;
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
  getAccountBalance: (address: string) => Promise<BigNumber>;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClient,
  username: null,
  setUsername: () => {},
  password: null,
  setPassword: () => {},
  wallet: null,
  setWallet: () => {},
  isUsernameAvailable: () => Promise.resolve(false),
  getAccountBalance: () => Promise.resolve(BigNumber.from(0)),
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

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
