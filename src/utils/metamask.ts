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
 * Checks that Metamask is available
 */
export function isMetamaskAvailable(): boolean {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

/**
 * Gets Metamask instance
 */
export function getMetamaskInstance() {
  if (!isMetamaskAvailable()) {
    throw new Error('Please install and unlock Metamask to use this feature.');
  }

  return window.ethereum;
}

/**
 * Gets an active address of Metamask
 */
export async function getAddress(): Promise<string> {
  const accounts = await getMetamaskInstance().request({
    method: 'eth_requestAccounts',
  });
  if (accounts && accounts.length) {
    return accounts[0];
  } else {
    throw new Error('Metamask address can not be received');
  }
}

/**
 * Gets crypto signature using an address and a text
 */
export async function getSignature(
  address: string,
  text: string
): Promise<string> {
  return getMetamaskInstance().request({
    method: 'personal_sign',
    params: [text, address],
  });
}

/**
 * Creates a wallet using Metamask signature
 */
export async function getSignatureWallet(): Promise<Wallet> {
  const MAX_ENTROPY_LENGTH = 32;
  const address = await getAddress();
  const signature = await getSignature(address, SIGN_WALLET_DATA);
  const slicedSignature = utils.hexDataSlice(signature, 0, MAX_ENTROPY_LENGTH);
  const mnemonic = utils.entropyToMnemonic(slicedSignature);

  return Wallet.fromMnemonic(mnemonic);
}

/**
 * Gets a chain ID
 */
export async function getChainId(): Promise<string> {
  return getMetamaskInstance().request({
    method: 'eth_chainId',
  });
}

/**
 * Switches to a network
 *
 * @param chainId network ID in hex
 */
export async function switchToNetwork(chainId: string) {
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
}

/**
 * Sends ETH to an address
 *
 * @param toAddress to ETH address
 * @param ethAmount amount of ETH
 */
export async function sendAmount(
  toAddress: string,
  ethAmount: string
): Promise<string> {
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
}
