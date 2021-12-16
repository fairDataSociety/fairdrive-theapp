import { ethers } from 'ethers';

export default async function generateMnemonic(): Promise<ethers.utils.Mnemonic> {
  const mnemonic = await ethers.Wallet.createRandom().mnemonic;

  return mnemonic;
}
