import { FC } from 'react';

import { Button } from '@components/Buttons';

import CopyLightIcon from '@media/UI/copy-light.svg';
import DownloadLightIcon from '@media/UI/download-light.svg';

interface MnemonicProps {}

const Mnemonic: FC<MnemonicProps> = () => {
  const testMonic = [
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
    'Word',
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="w-98">
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-2 grid-flow-row gap-x-32 gap-y-3">
            {testMonic.map((phrase, index) => {
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
            text="Copy all"
            icon={<CopyLightIcon className="inline ml-2" />}
            className="mr-3"
          />
          <Button
            variant="primary-outlined"
            text="Download all"
            icon={<DownloadLightIcon className="inline ml-2" />}
            className="ml-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Mnemonic;
