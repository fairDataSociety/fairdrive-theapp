import { Network } from '@data/networks';
import { ENS } from '@fairdatasociety/fdp-contracts-js';
import { BigNumber, providers, utils } from 'ethers';

const FDS_DOMAIN = 'fds';

export async function estimateRegistrationPrice(
  network: Network
): Promise<BigNumber> {
  const provider = new providers.JsonRpcProvider(network.ensConfig.rpcUrl);
  const ens = new ENS(network.ensConfig, provider, FDS_DOMAIN);
  return ens.registerUsernameApproximatePrice();
}

export function getAccountBalance(
  address: string,
  network: Network
): Promise<BigNumber> {
  return new providers.JsonRpcProvider(network.ensConfig.rpcUrl).getBalance(
    address
  );
}

export function hashUsername(username: string): string {
  return utils.namehash(`${username}.fds`);
}
