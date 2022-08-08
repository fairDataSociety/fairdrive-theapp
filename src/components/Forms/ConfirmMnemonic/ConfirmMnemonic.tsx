import { useMemo, useState } from 'react';
import router from 'next/router';

import { AuthenticationHeader } from '@components/Headers';
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

  const words = useMemo<Array<string>>(
    () => shuffleArray(mnemonic.split(' ')),
    [mnemonic]
  );

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
            onClick={() => router.push('/register/payment')}
          />
        </div>
      </div>
    </div>
  );
}
