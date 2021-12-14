import { useState, useEffect } from 'react';
import router from 'next/router';

import generateMnemonic from 'src/utils/generateMnemonic';

import { AuthenticationLayout } from '@components/Layouts';
import { AuthenticationHeader } from '@components/Headers';
import Mnemonic from '@components/Mnemonic/Mnemonic';
import { Checkbox } from '@components/Inputs';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { Button } from '@components/Buttons';

import type { NextPage } from 'next';

const RegisterSeed: NextPage = () => {
  const [mnemonic, setMnemonic] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    generateMnemonic()
      .then((result) => {
        setMnemonic(result.phrase);
      })
      .catch(() => console.log('Could not generate Mnemonic!'));
  }, []);

  const handleSeedContinue = () => {
    localStorage.setItem('registerMnemonic', mnemonic);
    router.push('/register/confirm-seed');
  };

  return (
    <AuthenticationLayout>
      <AuthenticationHeader
        heading="Registering account..."
        text="Your seed phrase is used to generate and recover your account. Please save these 12 words on a piece of paper or a hardware wallet. The order is important. This seed will allow you to recover your account."
      />

      {mnemonic ? <Mnemonic mnemonicPhrase={mnemonic} /> : null}

      <div className="flex justify-center items-center mt-10">
        <Checkbox
          name="confirm"
          label="I understand that if I lose my seed phrase I will not be able to recover my account."
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
      </div>

      <div className="my-5 text-center">
        <FeedbackMessage
          success={termsAccepted}
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
        text="Continue anyway?"
        className="block mb-10 mx-auto"
        disabled={!termsAccepted}
      />
    </AuthenticationLayout>
  );
};

export default RegisterSeed;
