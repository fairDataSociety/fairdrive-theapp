import { Network } from '@data/networks';
import { ENS } from '@fairdatasociety/fdp-contracts-js';
import { BigNumber, providers } from 'ethers';

const FDS_DOMAIN = 'fds';

export async function estimateRegistrationPrice(
  username: string,
  address: string,
  publicKey: string,
  network: Network
): Promise<BigNumber> {
  const provider = new providers.JsonRpcProvider(network.config.rpcUrl);
  const ens = new ENS(network.config, provider, FDS_DOMAIN);
  const [gasAmount, gasPrice] = await Promise.all([
    ens.registerUsernameEstimateGas(username, address, publicKey),
    provider.getFeeData(),
  ]);

  return gasPrice.maxFeePerGas.mul(gasAmount);
}
