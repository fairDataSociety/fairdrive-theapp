import fdp from '@fairdatasociety/fdp-storage';
import { Wallet } from 'ethers';

class AccountData
  implements Pick<fdp.AccountData, 'login' | 'register' | 'createWallet'>
{
  login(username: string, password: string): Promise<Wallet> {
    console.log({ username, password });
    return Promise.resolve(new Wallet(''));
  }

  register(username: string, password: string): Promise<Wallet> {
    console.log({ username, password });
    return Promise.resolve(new Wallet(''));
  }

  createWallet(): Wallet {
    return new Wallet('');
  }
}

class FdpStorage {
  constructor(beeUrl: string, beeDebugUrl: string) {
    console.log({ beeUrl, beeDebugUrl });
  }

  account: AccountData;
}

export { FdpStorage };
