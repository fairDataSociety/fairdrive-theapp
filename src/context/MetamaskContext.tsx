import React, { createContext, useContext, useEffect, useState } from 'react';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
import { getMetamaskMnemonic } from '@utils/localStorage';
import { getDefaultNetwork, useFdpStorage } from './FdpStorageContext';
import UserContext from './UserContext';
import { decryptMnemonic, getBasicSignature } from '@utils/metamask';
import { Wallet } from 'ethers';
import { useRouter } from 'next/router';

/**
 * Metamask context props
 */
interface MetamaskContextProps {
  connectMetamask: () => Promise<{ provider: SDKProvider; account: string }>;
  reset: () => void;
  metamaskWalletAddress: string;
  metamaskProvider: any;
  loading: boolean;
}

const MetamaskContext = createContext<MetamaskContextProps | null>(null);

export const MetamaskProvider: React.FC = ({ children }) => {
  const {
    fdpClientRef,
    setIsLoggedIn,
    setWallet,
    setFdpStorageType,
    setLoginType,
  } = useFdpStorage();
  const { setAddress, setMnemonic } = useContext(UserContext);
  const [metamaskWalletAddress, setMetamaskWalletAddress] =
    useState<string>('');
  const [metamaskProvider, setMetamaskProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const connectMetamask = async (
    name = 'Fairdrive'
  ): Promise<{ provider: SDKProvider; account: string }> => {
    setMetamaskProvider(null);
    setMetamaskWalletAddress('');

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

    const provider = window?.ethereum?.isMetaMask
      ? window?.ethereum
      : MMSDK.getProvider();

    setMetamaskProvider(provider);
    setMetamaskWalletAddress(accounts[0]);

    return { provider, account: accounts[0] };
  };

  const reset = () => {
    setMetamaskWalletAddress('');
    setMetamaskProvider(null);
  };

  const autoLogin = async () => {
    try {
      setLoading(true);
      const { provider, account } = await connectMetamask();
      const network = getDefaultNetwork();
      const signature = await getBasicSignature(provider, account);
      const mnemonic = decryptMnemonic(getMetamaskMnemonic(), signature);

      const wallet = Wallet.fromMnemonic(mnemonic);

      setFdpStorageType('native', network.config);
      fdpClientRef.current.account.setAccountFromMnemonic(mnemonic);
      setIsLoggedIn(true);
      setLoginType('metamask');
      setWallet(wallet);
      setAddress(wallet.address);
      setMnemonic(mnemonic);

      router.push('/drive');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('MetamaskContext');
    if (getMetamaskMnemonic()) {
      autoLogin();
    }
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        connectMetamask,
        reset,
        metamaskWalletAddress,
        metamaskProvider,
        loading,
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
