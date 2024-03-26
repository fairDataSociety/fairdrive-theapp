import { BigNumber } from 'ethers';

export interface SubItem {
  subHash: string;
  unlockKeyLocation: string;
  validTill: BigNumber;
}

export interface Subscription {
  subHash: string;
  fdpSellerNameHash: string;
  seller: string;
  swarmLocation: string;
  price: BigNumber;
  active: boolean;
  earned: BigNumber;
  bids: number;
  sells: number;
  reports: number;
  daysValid: number;
}
