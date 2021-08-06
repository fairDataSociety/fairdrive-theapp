import { ethers } from 'ethers';

export default async function generateMnemonic(): Promise<string> {
  // Wallet.createRandom().mnemonic
  // let bytes = ethers.utils.randomBytes(16);
  // let language = ethers.wordlists.en;
  const mnemonic = await ethers.Wallet.createRandom().mnemonic;
  return mnemonic;
}
export const shortenTitle = (title?: string): string => {
  if (title) {
    return `${title.slice(0, 10)}...${title.slice(title.length - 10)}`;
  } else {
    return '????';
  }
};