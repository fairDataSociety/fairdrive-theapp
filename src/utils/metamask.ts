import { WindowWithEthereum } from '@interfaces/window';
import { utils, Wallet } from 'ethers';

declare const window: WindowWithEthereum;

/**
 * FIP-63 data for signing
 */
export const SIGN_WALLET_DATA = 'I am granting FULL ACCESS to the FDP account';

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
  console.log('signature', signature, 'slicedSignature', slicedSignature);
  const mnemonic = utils.entropyToMnemonic(slicedSignature);

  return Wallet.fromMnemonic(mnemonic);
}
