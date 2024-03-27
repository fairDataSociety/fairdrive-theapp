import { enc } from 'crypto-js';
import { WindowWithEthereum } from '@interfaces/window';
import { utils, Wallet } from 'ethers';
import { extractDeeplinkURL } from '@utils/url';
import { SDKProvider } from '@metamask/sdk';
import { decrypt, encrypt } from './encryption';

declare const window: WindowWithEthereum;

/**
 * FIP-63 data for signing
 */
export const SIGN_WALLET_DATA = `I am granting FULL ACCESS to the FDP account`;

/**
 * FIP-63 data (upgraded) for signing
 */
const SIGN_WALLET_ADDRESS_DATA = `I am granting FULL ACCESS to the FDP account for address: {address}`;

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
 * Gets crypto signature using an address and a text
 *
 * @param provider Metamask provider
 * @param address Address
 * @param text Text
 */
export const getSignature = async (
  provider: any,
  address: string,
  text: string
): Promise<string> =>
  provider.request({
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

export function getBasicSignature(
  provider: SDKProvider,
  address: string
): Promise<string> {
  return getSignature(provider, address, getSignWalletData(address));
}

/**
 * Creates a basic wallet using Metamask signature
 *
 * @param provider Metamask provider
 * @param address Address
 * @param password Password
 */
export const getBasicSignatureWallet = async (
  provider: any,
  address: string,
  password = ''
): Promise<Wallet> => {
  const signature = await getBasicSignature(provider, address);
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

export function encryptMnemonic(mnemonic: string, signature: string): string {
  return enc.Base64.stringify(encrypt(signature, enc.Utf8.parse(mnemonic)));
}

export function decryptMnemonic(mnemonic: string, signature: string): string {
  return enc.Utf8.stringify(decrypt(signature, enc.Base64.parse(mnemonic)));
}

/**
 * Gets a chain ID
 *
 * @param provider Metamask provider
 */
export const getChainId = async (provider: any): Promise<string> =>
  provider.request({
    method: 'eth_chainId',
  });

/**
 * Switches to a network
 *
 * @param provider Metamask provider
 * @param chainId network ID in hex
 */
export const switchToNetwork = async (provider: any, chainId: string) => {
  const switchChain = async () => {
    return provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  };

  try {
    await switchChain();
  } catch (switchError) {
    if (switchError.code === 4902) {
      await provider.request({
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
 * @param provider Metamask provider
 * @param fromAddress from ETH address
 * @param toAddress to ETH address
 * @param ethAmount amount of ETH
 */
export const sendAmount = async (
  provider: any,
  fromAddress: string,
  toAddress: string,
  ethAmount: string
): Promise<string> => {
  const weiAmount = utils.parseUnits(ethAmount, 'ether');
  const hexAmount = utils.hexlify(weiAmount);
  const params = [
    {
      from: fromAddress,
      to: toAddress,
      value: hexAmount,
    },
  ];

  return provider.request({
    method: 'eth_sendTransaction',
    params,
  });
};

/**
 * Gets a deeplink for Metamask browser
 *
 * @param url URL of the site
 */
export function getMetamaskDeeplinkUrl(url: string): string {
  if (!url) {
    throw new Error('Please provide a url to generate a deeplink');
  }

  return `https://metamask.app.link/dapp/${extractDeeplinkURL(url)}`;
}

/**
 * Gets a data for signing a wallet
 *
 * @param address ETH address
 */
export function getSignWalletData(address: string): string {
  if (!utils.isAddress(address)) {
    throw new Error('Address is not a valid Ethereum address');
  }

  return SIGN_WALLET_ADDRESS_DATA.replace('{address}', address.toLowerCase());
}
