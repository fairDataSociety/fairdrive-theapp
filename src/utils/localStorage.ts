export enum LocalStorageKeys {
  NETWORK = 'network',
  METAMASK_MIGRATION_DIALOG = 'metamask-migration-dialog',
}

/**
 * Sets default network to local storage
 * @param network Network id
 */
export function setDefaultNetwork(network: string): void {
  localStorage.setItem(LocalStorageKeys.NETWORK, network);
}

/**
 * Gets default network from local storage
 */
export function getDefaultNetwork(): string | null {
  return localStorage.getItem(LocalStorageKeys.NETWORK);
}
