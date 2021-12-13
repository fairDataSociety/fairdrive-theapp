import type { NextPage } from 'next';

import { AuthenticationLayout } from '@components/Layouts';
import { AuthenticationHeader } from '@components/Headers';
import Mnemonic from '@components/Mnemonic/Mnemonic';
import { Checkbox } from '@components/Inputs';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { Button } from '@components/Buttons';

const RegisterSeed: NextPage = () => {
  return (
    <AuthenticationLayout>
      <AuthenticationHeader
        heading="Registering account..."
        text="Your seed phrase is used to generate and recover your account. Please save these 12 words on a piece of paper or a hardware wallet. The order is important. This seed will allow you to recover your account."
      />

      <Mnemonic />

      <div className="flex justify-center items-center mt-10">
        <Checkbox
          name="confirm"
          value="confirm"
          label="I understand that if I lose my seed phrase I will not be able to recover my account."
        />
      </div>

      <div className="my-5 text-center">
        <FeedbackMessage
          success={false}
          message="Don’t forget to secure your seed phrase!"
        />
      </div>

      <Button
        variant="secondary"
        text="Continue anyway?"
        className="block mb-10 mx-auto"
      />
    </AuthenticationLayout>
  );
};

export default RegisterSeed;
