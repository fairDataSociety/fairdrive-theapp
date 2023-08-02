import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { saveInvite } from '@utils/invite';

/**
 * Save invite key from url to local storage
 */
const SaveInvite = () => {
  const router = useRouter();

  const extractInviteKey = (uri: string): string | null => {
    const match = (uri || '').match(/\/#I_[a-f0-9]{64}/g);

    if (!match || match[0] !== uri) {
      return null;
    }

    return uri.substring(4);
  };

  useEffect(() => {
    const invite = extractInviteKey(router.asPath);
    if (invite) {
      saveInvite(invite);
    }
  }, []);

  return null;
};

export default SaveInvite;
