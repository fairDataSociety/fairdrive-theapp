export enum LocalStorageKeys {
  NETWORK = 'network',
  METAMASK_MIGRATION_DIALOG = 'metamask-migration-dialog',
  METAMASK_PASSPHRASE_EXPLANATION_HIDE = 'metamask-migration-explanation-hide',
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

/**
 * Sets default network to local storage
 * @param network Network id
 */
export function setMetamaskPassphraseExplanation(seen: boolean): void {
  localStorage.setItem(
    LocalStorageKeys.METAMASK_PASSPHRASE_EXPLANATION_HIDE,
    String(seen)
  );
}

/**
 * Gets default network from local storage
 */
export function getMetamaskPassphraseExplanation(): boolean {
  return Boolean(
    localStorage.getItem(LocalStorageKeys.METAMASK_PASSPHRASE_EXPLANATION_HIDE)
  );
}
