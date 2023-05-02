import { providers, Wallet, utils } from 'ethers';
import { FdpStorage } from '@fairdatasociety/fdp-storage';
import { BEE_URL, PRIVATE_KEY, RPC_PROVIDER_URL } from 'test/config/constants';

export async function createAccount(
  username: string,
  password: string,
  batchId: string
): Promise<void> {
  const provider = new providers.JsonRpcProvider(RPC_PROVIDER_URL);
  const fdp = new FdpStorage(BEE_URL, batchId as never);

  const wallet = new Wallet(PRIVATE_KEY, provider);

  const userWallet = fdp.account.createWallet();

  await wallet.sendTransaction({
    to: userWallet.address,
    value: utils.parseEther('1'),
  });

  await fdp.account.register(username, password);
}
