import { FC, useState } from 'react';
import router from 'next/router';

import { useForm } from 'react-hook-form';

import { createAccount } from '@api/authentication';

import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';

interface ConfirmMnemonicProps {}

const ConfirmMnemonic: FC<ConfirmMnemonicProps> = () => {
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data: any) => {
    let isMnemonicValid = true;

    const user = JSON.parse(localStorage.getItem('registerDetails'));
    const mnemonic = localStorage.getItem('registerMnemonic');

    const mnemonicArr = mnemonic.split(' ');

    if (data['word-5'] !== mnemonicArr[4]) {
      setErrorMessage('Mnemonic mismatch!');
      isMnemonicValid = false;
    }

    if (data['word-11'] !== mnemonicArr[10]) {
      setErrorMessage('Mnemonic mismatch!');
      isMnemonicValid = false;
    }

    if (data['word-12'] !== mnemonicArr[11]) {
      setErrorMessage('Mnemonic mismatch!');
      isMnemonicValid = false;
    }

    if (isMnemonicValid) {
      const registerData = {
        user_name: user.username,
        password: user.password,
        mnemonic: mnemonic,
      };

      createAccount(registerData)
        .then(() => {
          router.push('/overview');
        })
        .catch(() => {
          setErrorMessage(
            'Registration failed. Invalid credentials, please try again.'
          );
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        heading="Confirm your seed phrase"
        text="Please enter the required word from your seed phrase to complete registration."
      />

      <div className="w-98 mt-12 mb-8">
        <div className="mb-5 text-center">
          <FeedbackMessage message={errorMessage} success={false} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="# Word 5"
            id="word-5"
            type="text"
            name="word-5"
            placeholder="Type here"
            useFormRegister={register}
          />
          <AuthenticationInput
            label="# Word 11"
            id="word-11"
            type="text"
            name="word-11"
            placeholder="Type here"
            useFormRegister={register}
          />
          <AuthenticationInput
            label="# Word 12"
            id="word-12"
            type="text"
            name="word-12"
            placeholder="Type here"
            useFormRegister={register}
          />

          <div className="mt-14 text-center">
            <Button variant="secondary" type="submit" text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmMnemonic;
