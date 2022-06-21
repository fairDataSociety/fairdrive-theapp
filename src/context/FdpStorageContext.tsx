import { createContext, ReactNode, useContext } from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage';

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL
  // {
  //   ensOptions: {
  //     contractAddresses: {
  //       ensRegistry: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
  //       subdomainRegistrar: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
  //       publicResolver: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
  //     },
  //     rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  //     performChecks: null,
  //   },
  // }
);

interface FdpStorageContextProps {
  children: ReactNode;
}

interface FdpStorageContext {
  fdpClient: FdpStorage;
}

const FdpStorageContext = createContext<FdpStorageContext>({
  fdpClient,
});

function FdpStorageProvider(props: FdpStorageContextProps) {
  const { children } = props;

  return (
    <FdpStorageContext.Provider value={{ fdpClient }}>
      {children}
    </FdpStorageContext.Provider>
  );
}

function useFdpStorage() {
  return useContext(FdpStorageContext);
}

export default FdpStorageContext;
export { FdpStorageProvider, useFdpStorage };
