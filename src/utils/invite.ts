import { Wallet } from 'ethers';
import { getUnixTimestamp } from '@utils/formatDate';
import { v4 as uuid } from 'uuid';

/**
 * Message to sign when user first time login with an invite via Metamask
 */
export const LOGIN_MESSAGE_TO_SIGN = 'Invitation activated';
export const INVITES_LOCAL_STORAGE_KEY = 'fd_invites';
export const INVITE_LOCAL_STORAGE_KEY = 'fd_invite';
export const INVITE_NAME_MIN_LENGTH = 1;
export const INVITE_NAME_MAX_LENGTH = 255;
export const INVITE_SHARE_URL = `${process.env.NEXT_PUBLIC_BB_API_URL}/v1/invite`;

/**
 * Invites statuses
 */
export interface InvitesStatuses {
  [key: string]: {
    /**
     * Is invite used for login
     */
    isUsed: boolean;

    /**
     * Is account created with invite
     */
    isAccountCreated: boolean;
  };
}

/**
 * Invites statuses response
 */
export interface InvitesStatusesResponse {
  status: string;
  data: {
    invites: InvitesStatuses;
  };
}

/**
 * Invite related data
 */
export interface Invite {
  /**
   * Invite ID
   */
  id: string;
  /**
   * Invite code prepared for sharing
   */
  invite: string;
  /**
   * Address of the invite
   */
  address: string;
  /**
   * Timestamp of invite creation
   */
  createdAt: number;
  /**
   * Name of invite
   */
  name?: string;
}

export function assertInvitesStatusesResponse(
  value: unknown
): asserts value is InvitesStatusesResponse {
  const response = value as InvitesStatusesResponse;
  if (typeof response !== 'object' || !response) {
    throw new Error('Invites statuses response is not valid');
  }

  if (response.status !== 'ok') {
    throw new Error('Invites statuses response status is not "ok"');
  }

  if (!response.data) {
    throw new Error('Invites statuses response "data" is not valid');
  }

  if (!response.data.invites) {
    throw new Error('Invites statuses response "invites" is not valid');
  }

  Object.values(response.data.invites).forEach((invite) => {
    if (typeof invite !== 'object' || !invite) {
      throw new Error('Invite data is not valid');
    }

    if (typeof invite.isUsed !== 'boolean') {
      throw new Error('Invite "isUsed" is not valid');
    }

    if (typeof invite.isAccountCreated !== 'boolean') {
      throw new Error('Invite "isAccountCreated" is not valid');
    }
  });
}

/**
 * Checks that invite data is valid
 */
export function assertInvite(value: unknown): asserts value is Invite {
  const invite = value as Invite;
  if (typeof invite !== 'object' || !invite) {
    throw new Error('Invite data is not valid');
  }

  if (!invite.id) {
    throw new Error('Invite ID is not valid');
  }

  if (!invite.invite) {
    throw new Error('Invite code is not valid');
  }

  if (!invite.createdAt) {
    throw new Error('Invite creation date is not valid');
  }

  if (
    invite.name &&
    (invite.name.length < INVITE_NAME_MIN_LENGTH ||
      invite.name.length > INVITE_NAME_MAX_LENGTH)
  ) {
    throw new Error('Invite name is not valid');
  }
}

/**
 * Creates an invite using a random wallet
 */
export function createInvite(): Invite {
  const wallet = Wallet.createRandom();
  return {
    id: uuid(),
    invite: wallet.privateKey,
    address: wallet.address,
    createdAt: getUnixTimestamp(),
  };
}

/**
 * Saves invite locally
 */
export function saveInviteLocally(invite: Invite): void {
  const invites = getInvitesLocally();
  invites.push(invite);
  localStorage.setItem(INVITES_LOCAL_STORAGE_KEY, JSON.stringify(invites));
}

/**
 * Gets invites from local storage
 */
export function getInvitesLocally(): Invite[] {
  const json = localStorage.getItem(INVITES_LOCAL_STORAGE_KEY);
  if (!json) {
    return [];
  }

  const invites = JSON.parse(json);
  if (!Array.isArray(invites)) {
    throw new Error('Invites data is not valid');
  }

  invites.forEach(assertInvite);
  return invites;
}

/**
 * Updates invite locally
 */
export function updateInviteLocally(invite: Invite): void {
  const invites = getInvitesLocally();
  const index = invites.findIndex((item) => item.id === invite.id);
  if (index === -1) {
    throw new Error('Invite not found');
  }

  invites[index] = invite;
  localStorage.setItem(INVITES_LOCAL_STORAGE_KEY, JSON.stringify(invites));
}

/**
 * Deletes invite locally by invite id
 */
export function deleteInviteLocally(inviteId: string): void {
  const invites = getInvitesLocally();
  const index = invites.findIndex((item) => item.id === inviteId);
  if (index === -1) {
    throw new Error('Invite not found');
  }

  invites.splice(index, 1);
  localStorage.setItem(INVITES_LOCAL_STORAGE_KEY, JSON.stringify(invites));
}

/**
 * Concatenates invite server url and invite private key
 */
export function makeInviteUrl(invite: string) {
  return `${process.env.NEXT_PUBLIC_FAIRDRIVEHOST}/#I_${invite.replace(
    '0x',
    ''
  )}`;
}

/**
 * Saves invite to local storage
 */
export function saveInvite(invite: string): void {
  localStorage.setItem(INVITE_LOCAL_STORAGE_KEY, invite);
}

/**
 * Gets invite from local storage
 */
export function getInvite(): string | null {
  return localStorage.getItem(INVITE_LOCAL_STORAGE_KEY);
}

/**
 * Shares invite address with signature of inviter and invite
 *
 * @param inviterPrivateKey Inviter private key for signing invite address
 * @param invitePrivateKey Invite private key for signing inviter address
 */
export async function shareInvite(
  inviterPrivateKey: string,
  invitePrivateKey: string
): Promise<void> {
  const inviterWallet = new Wallet(inviterPrivateKey);
  const inviteWallet = new Wallet(invitePrivateKey);
  const inviterSignature = await inviterWallet.signMessage(
    inviteWallet.address.toLowerCase()
  );
  const inviteSignature = await inviteWallet.signMessage(
    inviterWallet.address.toLowerCase()
  );

  const data = {
    inviter_address: inviterWallet.address.toLowerCase(),
    invite_address: inviteWallet.address.toLowerCase(),
    inviter_signature: inviterSignature,
    invite_signature: inviteSignature,
  };

  await fetch(`${INVITE_SHARE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Gets invite statuses
 *
 * @param ownerAddress Owner address for checking invite statuses
 * @param invites Invites for checking statuses
 */
export async function getInvitesStatuses(
  ownerAddress: string,
  invites: Invite[]
): Promise<InvitesStatuses> {
  const inviteAddresses = invites.map((invite) => invite.address);
  const response = await fetch(`${INVITE_SHARE_URL}/inviter/${ownerAddress}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      invites: inviteAddresses,
    }),
  });

  const responseObject = await response.json();
  assertInvitesStatusesResponse(responseObject);

  return responseObject.data.invites;
}

/**
 * First time login with an invite
 *
 * @param invitePrivateKey Invite private key for signing the login message
 */
export async function login(invitePrivateKey: string): Promise<void> {
  const inviteWallet = new Wallet(invitePrivateKey);
  const inviteSignature = await inviteWallet.signMessage(LOGIN_MESSAGE_TO_SIGN);

  const data = {
    invite_address: inviteWallet.address.toLowerCase(),
    invite_signature: inviteSignature,
  };

  const response = await fetch(`${INVITE_SHARE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to login with invite');
  }

  const responseObject = await response.json();
  if (responseObject.status !== 'ok') {
    throw new Error(responseObject.message);
  }
}
