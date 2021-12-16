import { FC, useState } from 'react';

import { Button } from '@components/Buttons';

import CopyIcon from '@media/UI/copy.svg';
import DownloadIcon from '@media/UI/download.svg';

interface MnemonicProps {
  mnemonicPhrase: string;
}

const Mnemonic: FC<MnemonicProps> = ({ mnemonicPhrase }) => {
  const [copyComplete, setCopyComplete] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(mnemonicPhrase)
      .then(() => {
        setCopyComplete(true);
        setTimeout(() => setCopyComplete(false), 4000);
      })
      .catch(() => console.log('Could not copy mnemonic!'));
  };

  const handleDownloadClick = () => {
    try {
      const blob = new Blob([mnemonicPhrase], { type: 'text/text' });

      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = 'seed.txt';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);

      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 4000);
    } catch (err) {
      console.log('Could not download mnemonic!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="w-98">
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-2 grid-flow-row gap-x-32 gap-y-3">
            {mnemonicPhrase.split(' ').map((phrase, index) => {
              return (
                <div
                  key={index}
                  className="font-normal text-color-accents-plum-black text-base text-center dark:text-color-accents-soft-lavender"
                >
                  {index + 1}. {phrase}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full text-center mt-12">
          <Button
            variant="primary-outlined"
            onClick={handleCopyClick}
            label={copyComplete ? 'Copied!' : 'Copy all'}
            icon={<CopyIcon className="inline ml-2" />}
            className="mr-3"
          />

          <Button
            variant="primary-outlined"
            onClick={handleDownloadClick}
            label={downloadComplete ? 'Downloaded!' : 'Download all'}
            icon={<DownloadIcon className="inline ml-2" />}
            className="ml-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Mnemonic;
