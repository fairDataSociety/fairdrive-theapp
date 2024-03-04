import { FdpContracts } from '@fairdatasociety/fdp-storage';

const { getEnsEnvironmentConfig, getDataHubEnvironmentConfig, Environments } =
  FdpContracts;

export interface Network {
  name: string;
  id: FdpContracts.Environments;
  chainId: number;
  ensConfig: FdpContracts.EnsEnvironment;
  datahubConfig: FdpContracts.DataHubEnvironment;
}

export const networks: Network[] = [
  {
    name: 'Sepolia',
    id: Environments.SEPOLIA,
    chainId: 11155111,
    ensConfig: getEnsEnvironmentConfig(Environments.SEPOLIA),
    datahubConfig: {
      ...getDataHubEnvironmentConfig(Environments.SEPOLIA),
      dataHubAddress: '0xBE41b272e3cDe3aeC8fE4a144C5b7cE71D9e6498',
    },
  },
  {
    name: 'Görli',
    id: Environments.GOERLI,
    chainId: 5,
    ensConfig: getEnsEnvironmentConfig(Environments.GOERLI),
    datahubConfig: getDataHubEnvironmentConfig(Environments.GOERLI),
  },
  {
    name: 'Optimism Goerli',
    id: Environments.OPTIMISM_GOERLI,
    chainId: 420,
    ensConfig: getEnsEnvironmentConfig(Environments.OPTIMISM_GOERLI),
    datahubConfig: getDataHubEnvironmentConfig(Environments.OPTIMISM_GOERLI),
  },
  {
    name: 'Arbitrum Goerli',
    id: Environments.ARBITRUM_GOERLI,
    chainId: 421613,
    ensConfig: getEnsEnvironmentConfig(Environments.ARBITRUM_GOERLI),
    datahubConfig: getDataHubEnvironmentConfig(Environments.ARBITRUM_GOERLI),
  },
];

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'PRODUCTION') {
  networks.unshift({
    name: 'FDP Play',
    id: Environments.LOCALHOST,
    chainId: 4020,
    ensConfig: getEnsEnvironmentConfig(Environments.LOCALHOST),
    datahubConfig: getDataHubEnvironmentConfig(Environments.LOCALHOST),
  });
}
