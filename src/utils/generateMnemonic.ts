import { Wallet } from 'ethers';
import { Mnemonic } from 'ethers/lib/utils';

export default function generateMnemonic(): Mnemonic {
  return Wallet.createRandom().mnemonic;
}
