import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const INVITE_LOCAL_STORAGE_KEY = 'fd_invite';

const SaveInvite = () => {
  const router = useRouter();

  const extractInviteKey = (uri: string): string | null => {
    const match = (uri || '').match(/\/#I_[a-f0-9]{64}/g);

    if (!match || match[0] !== uri) {
      return null;
    }

    return `0x${uri.substring(4)}`;
  };

  const saveInvite = () => {
    const inviteKey = extractInviteKey(router.asPath);

    if (inviteKey) {
      localStorage.setItem(INVITE_LOCAL_STORAGE_KEY, inviteKey);
      console.log('Invite saved to local storage.');
    }
  };

  useEffect(() => {
    saveInvite();
  }, []);

  return null;
};

export default SaveInvite;
