import { WindowWithEthereum } from '@interfaces/window';
import { utils, Wallet } from 'ethers';

declare const window: WindowWithEthereum;

/**
 * FIP-63 data for signing
 */
export const SIGN_WALLET_DATA = 'I am granting FULL ACCESS to the FDP account';

/**
 * Sepolia network ID in decimal
 */
export const NETWORK_SEPOLIA = 11155111;

/**
 * Max entropy length
 */
export const MAX_ENTROPY_LENGTH = 32;

/**
 * Checks that Metamask is available
 */
export const isMetamaskAvailable = (): boolean =>
  typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

/**
 * Gets Metamask instance
 */
export const getMetamaskInstance = () => {
  if (!isMetamaskAvailable()) {
    throw new Error('Please install and unlock Metamask to use this feature.');
  }

  return window.ethereum;
};

/**
 * Gets an active address of Metamask
 */
export const getAddress = async (): Promise<string> => {
  const accounts = await getMetamaskInstance().request({
    method: 'eth_requestAccounts',
  });
  if (accounts && accounts.length) {
    return accounts[0];
  } else {
    throw new Error('Metamask address can not be received');
  }
};

/**
 * Gets crypto signature using an address and a text
 */
export const getSignature = async (
  address: string,
  text: string
): Promise<string> =>
  getMetamaskInstance().request({
    method: 'personal_sign',
    params: [text, address],
  });

/**
 * Converts a signature to a wallet
 *
 * @param signature Signature
 */
export const signatureToWallet = (signature: string): Wallet => {
  const slicedSignature = utils.hexDataSlice(signature, 0, MAX_ENTROPY_LENGTH);
  const mnemonic = utils.entropyToMnemonic(slicedSignature);

  return Wallet.fromMnemonic(mnemonic);
};

/**
 * Creates a basic wallet using Metamask signature
 */
export const getBasicSignatureWallet = async (
  password = ''
): Promise<Wallet> => {
  const address = await getAddress();
  const signature = await getSignature(address, SIGN_WALLET_DATA);
  const wallet = signatureToWallet(signature);
  if (password) {
    return decryptWallet(wallet, password);
  } else {
    return wallet;
  }
};

/**
 * Extracts an encrypted wallet from basic wallet
 *
 * @param wallet Basic wallet
 * @param password Password
 */
export const decryptWallet = async (wallet: Wallet, password: string) => {
  const signature = await wallet.signMessage(
    utils.sha256(utils.toUtf8Bytes(password))
  );

  return signatureToWallet(signature);
};

/**
 * Gets a chain ID
 */
export const getChainId = async (): Promise<string> =>
  getMetamaskInstance().request({
    method: 'eth_chainId',
  });

/**
 * Switches to a network
 *
 * @param chainId network ID in hex
 */
export const switchToNetwork = async (chainId: string) => {
  const metamask = getMetamaskInstance();

  const switchChain = async () => {
    return metamask.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  };

  try {
    await switchChain();
  } catch (switchError) {
    if (switchError.code === 4902) {
      await metamask.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId,
            chainName: 'Sepolia',
            nativeCurrency: {
              name: 'Sepolia',
              symbol: 'SepoliaETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          },
        ],
      });
      await switchChain();
    } else {
      console.log(`There was an issue switching to the "${chainId}" network.`);
    }
  }
};

/**
 * Sends ETH to an address
 *
 * @param toAddress to ETH address
 * @param ethAmount amount of ETH
 */
export const sendAmount = async (
  toAddress: string,
  ethAmount: string
): Promise<string> => {
  const metamask = getMetamaskInstance();
  const address = await getAddress();
  const weiAmount = utils.parseUnits(ethAmount, 'ether');
  const hexAmount = utils.hexlify(weiAmount);
  const params = [
    {
      from: address,
      to: toAddress,
      value: hexAmount,
    },
  ];

  return metamask.request({
    method: 'eth_sendTransaction',
    params,
  });
};
