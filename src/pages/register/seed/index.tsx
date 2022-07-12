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

const RegisterSeed: NextPage = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { mnemonic } = useFdpStorage();
  const router = useRouter();

  useEffect(() => {
    if (!mnemonic) {
      router.push('/register');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mnemonic) {
    return <></>;
  }

  const handleSeedContinue = () => {
    router.push('/register/confirm-seed');
  };

  return (
    <AuthenticationLayout>
      <div className="flex flex-col justify-center items-center">
        <AuthenticationHeader
          title="Registering account..."
          content="Your seed phrase is used to generate and recover your account. Please save these 12 words on a piece of paper or a hardware wallet. The order is important. This seed will allow you to recover your account."
        />

        {mnemonic ? <Mnemonic mnemonicPhrase={mnemonic.phrase} /> : null}

        <div className="flex justify-center items-center mt-10">
          <Checkbox
            name="confirm"
            label="I understand that if I lose my seed phrase I will not be able to recover my account."
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
        </div>

        <div className="my-5 text-center">
          <FeedbackMessage
            type={termsAccepted ? 'success' : 'error'}
            message={
              termsAccepted
                ? 'You confirm you have secured your seed phrase'
                : 'Don’t forget to secure your seed phrase!'
            }
          />
        </div>

        <Button
          variant="secondary"
          onClick={handleSeedContinue}
          label="Continue"
          className="block mb-10 mx-auto"
          disabled={!termsAccepted}
        />
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterSeed;
