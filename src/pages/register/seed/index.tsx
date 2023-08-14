import { useEffect, useState } from 'react';

import { AuthenticationLayout } from '@components/Layouts';
import { AuthenticationHeader } from '@components/Headers';
import Mnemonic from '@components/Mnemonic/Mnemonic';
import { Checkbox } from '@components/Inputs';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { Button } from '@components/Buttons';

import type { NextPage } from 'next';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
import { useLocales } from '@context/LocalesContext';

const RegisterSeed: NextPage = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { wallet } = useFdpStorage();
  const router = useRouter();
  const { intl } = useLocales();

  useEffect(() => {
    if (!wallet) {
      router.push('/register');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wallet) {
    return <></>;
  }

  const handleSeedContinue = () => {
    router.push('/register/confirm-seed');
  };

  return (
    <AuthenticationLayout>
      <div className="flex flex-col justify-center items-center">
        <AuthenticationHeader
          title={intl.get('REGISTERING_ACCOUNT')}
          content={intl.get('REGISTERING_ACCOUNT_DESCRIPTION')}
        />

        {wallet ? <Mnemonic mnemonicPhrase={wallet.mnemonic.phrase} /> : null}

        <div className="flex justify-center items-center mt-10">
          <Checkbox
            name="confirm"
            label={intl.get('MNEMONIC_CONFIRMATION_LABEL')}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
        </div>

        <div className="my-5 text-center">
          <FeedbackMessage
            type={termsAccepted ? 'success' : 'error'}
            message={intl.get(
              termsAccepted
                ? 'SECURED_SEED_CONFIRMATION'
                : 'SECURE_YOUR_SEED_PHRASE'
            )}
          />
        </div>

        <Button
          variant="secondary"
          onClick={handleSeedContinue}
          label={intl.get('CONTINUE')}
          className="block mb-10 mx-auto"
          disabled={!termsAccepted}
        />
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterSeed;
