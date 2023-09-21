import { Network } from '@data/networks';
import { ENS, Environments } from '@fairdatasociety/fdp-contracts-js';
import { BigNumber, providers } from 'ethers';

const FDS_DOMAIN = 'fds';

export async function estimateRegistrationPrice(
  network: Network
): Promise<BigNumber> {
  const provider = new providers.JsonRpcProvider(network.config.rpcUrl);
  const ens = new ENS(network.config, provider, FDS_DOMAIN);
  return ens.registerUsernameApproximatePrice();
}

export function getAccountBalance(
  address: string,
  network: Network
): Promise<BigNumber> {
  return new providers.JsonRpcProvider(network.config.rpcUrl).getBalance(
    address
  );
}
