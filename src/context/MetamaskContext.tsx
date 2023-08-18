import React, { createContext, useContext, useState } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

/**
 * Metamask context props
 */
interface MetamaskContextProps {
  connectMetamask: () => Promise<void>;
  metamaskWalletAddress: string;
  metamaskProvider: any;
}

const MetamaskContext = createContext<MetamaskContextProps | null>(null);

export const MetamaskProvider: React.FC = ({ children }) => {
  const [metamaskWalletAddress, setMetamaskWalletAddress] =
    useState<string>('');
  const [metamaskProvider, setMetamaskProvider] = useState<any>(null);

  const connectMetamask = async (name = 'Fairdrive'): Promise<void> => {
    if (metamaskProvider && metamaskWalletAddress) {
      return;
    }

    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name,
      },
      // If MetaMask browser extension is detected, directly use it.
      extensionOnly: true,
    });

    let accounts: Partial<unknown>;
    if (window?.ethereum?.isMetaMask) {
      accounts = await window?.ethereum?.request({
        method: 'eth_requestAccounts',
        params: [],
      });
    } else {
      accounts = await MMSDK.connect();
    }

    if (!accounts || !accounts[0]) {
      throw new Error('No accounts available');
    }

    setMetamaskProvider(
      window?.ethereum?.isMetaMask ? window?.ethereum : MMSDK.getProvider()
    );
    setMetamaskWalletAddress(accounts[0]);
  };

  return (
    <MetamaskContext.Provider
      value={{
        connectMetamask,
        metamaskWalletAddress,
        metamaskProvider,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamask = (): MetamaskContextProps => {
  const context = useContext(MetamaskContext);
  if (!context) {
    throw new Error('useMetamask must be used within a MetamaskProvider');
  }
  return context;
};
