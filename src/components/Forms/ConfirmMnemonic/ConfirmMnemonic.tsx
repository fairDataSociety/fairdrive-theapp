import { FC } from 'react';
import Link from 'next/link';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

interface ConfirmMnemonicProps {}

const ConfirmMnemonic: FC<ConfirmMnemonicProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        heading="Confirm your seed phrase"
        text="Please enter the required word from your seed phrase to complete registration."
      />

      <div className="w-98 mt-12 mb-8">
        <form action="" autoComplete="off" className="w-full">
          <AuthenticationInput
            label="# Word 5"
            id="word-5"
            type="text"
            name="word-5"
            placeholder="Type here"
          />
          <AuthenticationInput
            label="# Word 11"
            id="word-11"
            type="text"
            name="word-11"
            placeholder="Type here"
          />
          <AuthenticationInput
            label="# Word 12"
            id="word-12"
            type="text"
            name="word-12"
            placeholder="Type here"
          />

          <div className="mt-14 text-center">
            <Button variant="secondary" text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmMnemonic;
