/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage';
import { Mnemonic } from 'ethers/lib/utils';

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL,
  {
    ensOptions: {
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
      contractAddresses: {
        ensRegistry: process.env.NEXT_PUBLIC_ENS_REGISTRY_ADDRESS,
        subdomainRegistrar: process.env.NEXT_PUBLIC_SUBDOMAIN_REGISTRAR_ADDRESS,
        publicResolver: process.env.NEXT_PUBLIC_PUBLIC_RESOLVER_ADDRESS,
      },
      performChecks: true,
    },
  }
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
  mnemonic: Mnemonic | null;
  setMnemonic: (mnemonic: Mnemonic) => void;
  isUsernameAvailable: (username: string) => Promise<boolean | string>;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClient,
  username: null,
  setUsername: () => {},
  password: null,
  setPassword: () => {},
  mnemonic: null,
  setMnemonic: () => {},
  isUsernameAvailable: () => Promise.resolve(false),
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [mnemonic, setMnemonic] = useState<Mnemonic | null>(null);

  const isUsernameAvailable = async (
    username: string
  ): Promise<boolean | string> => {
    try {
      const isAvailable = await fdpClient.ens.isUsernameAvailable(username);
      return isAvailable;
    } catch (error) {
      return error.message;
    }
  };

  return (
    <FdpStorageContext.Provider
      value={{
        fdpClient,
        username,
        setUsername,
        password,
        setPassword,
        mnemonic,
        setMnemonic,
        isUsernameAvailable,
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
