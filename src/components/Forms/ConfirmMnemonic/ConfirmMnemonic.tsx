import { FC, useContext, useMemo, useState } from 'react';
import router from 'next/router';
import { useForm } from 'react-hook-form';

import UserContext from '@context/UserContext';
import PodContext from '@context/PodContext';

import { createAccount, login, userStats } from '@api/authentication';
import { createPod } from '@api/pod';

import { AuthenticationHeader } from '@components/Headers';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { Button } from '@components/Buttons';
import Chip from '@components/Chip/Chip';
import shuffleArray from '@utils/shuffleArray';

interface ConfirmMnemonicProps {
  mnemonic: string;
}

export default function ConfirmMnemonic(props: ConfirmMnemonicProps) {
  const { mnemonic } = props;
  // const { clearPodContext } = useContext(PodContext);
  const [selected, setSelected] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const words = useMemo<Array<string>>(
    () => shuffleArray(mnemonic.split(' ')),
    [mnemonic]
  );

  // const onSubmit = (data: ConfirmMnemonic) => {
  //   const user = JSON.parse(localStorage.getItem('registerUser'));
  //   const mnemonic = localStorage.getItem('registerMnemonic');

  //   const mnemonicArr = mnemonic.split(' ');

  //   if (
  //     data['word-5'] === mnemonicArr[4] ||
  //     data['word-11'] === mnemonicArr[10] ||
  //     data['word-12'] === mnemonicArr[11]
  //   ) {
  //     const registerData = {
  //       user_name: user.user_name,
  //       password: user.password,
  //       mnemonic: mnemonic,
  //     };

  //     createAccount(registerData)
  //       .then(async () => {
  //         setUser(user.user_name);
  //         setPassword(user.password);

  //         try {
  //           await createPod('Home', user.password);
  //           await createPod('Consents', user.password);
  //           await createPod('Images', user.password);
  //         } catch (error) {
  //           console.log('Error: Could not create initial pods.');
  //         }

  //         login({ user_name: user.user_name, password: user.password })
  //           .then(() => {
  //             userStats()
  //               .then((res) => {
  //                 setAddress(res.data.reference);
  //                 clearPodContext();
  //                 router.push('/overview');
  //               })
  //               .catch(() => {
  //                 setErrorMessage(
  //                   'Login failed. Incorrect user credentials, please try again.'
  //                 );
  //               });
  //           })
  //           .catch(() => {
  //             setErrorMessage(
  //               'Login failed. Incorrect user credentials, please try again.'
  //             );
  //           });
  //       })
  //       .catch(() => {
  //         setErrorMessage(
  //           'Registration failed. Invalid credentials, please try again.'
  //         );
  //       });
  //   } else {
  //     setErrorMessage('Mnemonic mismatch!');
  //   }
  // };

  const getWordIndex = (word: string) => {
    return selected.indexOf(word);
  };

  const selectWord = (word: string) => {
    const wordIndex = getWordIndex(word);
    if (wordIndex === -1) {
      setSelected([...selected, word]);
    } else {
      setSelected(selected.filter((w) => w !== word));
    }
  };

  const isOrderCorrect = selected.join(' ') === mnemonic;

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        title="Confirm your seed phrase"
        content="Please select the words from your seed phrase in order of appearance to complete registration."
      />

      <div className="w-98 mt-10 mb-8">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <div className="flex flex-wrap gap-4">
          {words.map((word, i) => {
            return (
              <Chip
                onClick={() => selectWord(word)}
                selected={getWordIndex(word) > -1}
                key={`chip-${i}`}
              >
                {word}
              </Chip>
            );
          })}
        </div>

        <ol className="list-decimal list-inside my-10 grid grid-cols-2 items-center">
          {selected.map((word, i) => {
            return (
              <li
                className="text-2xl dark:text-color-accents-soft-lavender"
                key={`selected-${i}`}
              >
                {word}
              </li>
            );
          })}
        </ol>

        <div className="text-center">
          <Button
            disabled={!isOrderCorrect}
            variant="secondary"
            label="Register"
          />
        </div>

        {/* <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="# Word 5"
            id="word-5"
            type="text"
            name="word-5"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.user_name}
            errorMessage="Mnemonic Word #5 is required"
          />

          <AuthenticationInput
            label="# Word 11"
            id="word-11"
            type="text"
            name="word-11"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.user_name}
            errorMessage="Mnemonic Word #11 is required"
          />

          <AuthenticationInput
            label="# Word 12"
            id="word-12"
            type="text"
            name="word-12"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            error={errors.user_name}
            errorMessage="Mnemonic Word #12 is required"
          />

          <div className="mt-14 text-center">
            <Button type="submit" variant="secondary" label="Register" />
          </div>
        </form> */}
      </div>
    </div>
  );
}
