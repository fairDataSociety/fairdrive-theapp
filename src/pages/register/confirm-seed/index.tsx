import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { ConfirmMnemonic } from '@components/Forms';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RegisterConfirmSeed: NextPage = () => {
  const { wallet } = useFdpStorage();
  const router = useRouter();

  useEffect(() => {
    if (!wallet) {
      router.push('/register');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wallet) {
    return <></>;
  }

  return (
    <AuthenticationLayout>
      <ConfirmMnemonic mnemonic={wallet.mnemonic.phrase} />
    </AuthenticationLayout>
  );
};

export default RegisterConfirmSeed;
