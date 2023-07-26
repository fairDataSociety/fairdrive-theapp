import { FdpContracts } from '@fairdatasociety/fdp-storage';

const { getEnsEnvironmentConfig, Environments } = FdpContracts;

export interface Network {
  name: string;
  id: FdpContracts.Environments;
  chainId: number;
  config: FdpContracts.EnsEnvironment;
}

export const networks: Network[] = [
  {
    name: 'Sepolia',
    id: Environments.SEPOLIA,
    chainId: 11155111,
    config: getEnsEnvironmentConfig(Environments.SEPOLIA),
  },
  {
    name: 'Görli',
    id: Environments.GOERLI,
    chainId: 5,
    config: getEnsEnvironmentConfig(Environments.GOERLI),
  },
  {
    name: 'Optimism Goerli',
    id: Environments.OPTIMISM_GOERLI,
    chainId: 420,
    config: getEnsEnvironmentConfig(Environments.OPTIMISM_GOERLI),
  },
  {
    name: 'Arbitrum Goerli',
    id: Environments.ARBITRUM_GOERLI,
    chainId: 421613,
    config: getEnsEnvironmentConfig(Environments.ARBITRUM_GOERLI),
  },
];

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PRODUCTION') {
  networks.unshift({
    name: 'FDP Play',
    id: Environments.LOCALHOST,
    chainId: 4020,
    config: getEnsEnvironmentConfig(Environments.LOCALHOST),
  });
}
