import { FdpContracts } from '@fairdatasociety/fdp-storage';

const { getEnsEnvironmentConfig, Environments } = FdpContracts;

export interface Network {
  name: string;
  id: FdpContracts.Environments;
  config: FdpContracts.EnsEnvironment;
}

export const networks: Network[] = [
  {
    name: 'Sepolia',
    id: Environments.SEPOLIA,
    config: getEnsEnvironmentConfig(Environments.SEPOLIA),
  },
  {
    name: 'Görli',
    id: Environments.GOERLI,
    config: getEnsEnvironmentConfig(Environments.GOERLI),
  },
  {
    name: 'Optimism Goerli',
    id: Environments.OPTIMISM_GOERLI,
    config: getEnsEnvironmentConfig(Environments.OPTIMISM_GOERLI),
  },
  {
    name: 'Arbitrum Goerli',
    id: Environments.ARBITRUM_GOERLI,
    config: getEnsEnvironmentConfig(Environments.ARBITRUM_GOERLI),
  },
];

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PRODUCTION') {
  networks.unshift({
    name: 'FDP Play',
    id: Environments.LOCALHOST,
    config: getEnsEnvironmentConfig(Environments.LOCALHOST),
  });
}
