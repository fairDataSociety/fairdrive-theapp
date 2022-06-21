import { createContext, ReactNode, useContext } from 'react';
import { FdpStorage } from '@fairdatasociety/fdp-storage';

const fdpClient = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL
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
