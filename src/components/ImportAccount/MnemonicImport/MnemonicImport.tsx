/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from 'react';
interface MnemonicImportProps {
  type: 'text';
  mnemonicSeed: any;
  setMnemonicSeed: any;
  placeholder?: string;
  defaultValue?: string | number;
}

const MnemonicImport: FC<MnemonicImportProps> = ({
  type,
  placeholder,
  setMnemonicSeed,
  mnemonicSeed,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 1
          </label>

          <input
            type={type}
            id={'first-word'}
            value={mnemonicSeed.firstWord}
            onChange={(e) => {
              setMnemonicSeed({ ...mnemonicSeed, firstWord: e.target.value });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 7
          </label>

          <input
            type={type}
            id={'seventh-word'}
            value={mnemonicSeed.seventhWord}
            onChange={(e) => {
              setMnemonicSeed({ ...mnemonicSeed, seventhWord: e.target.value });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 2
          </label>

          <input
            type={type}
            value={mnemonicSeed.secondWord}
            onChange={(e) => {
              setMnemonicSeed({ ...mnemonicSeed, secondWord: e.target.value });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 8
          </label>

          <input
            type={type}
            value={mnemonicSeed.eighthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                eighthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 3
          </label>

          <input
            type={type}
            value={mnemonicSeed.thirdWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                thirdWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 9
          </label>

          <input
            type={type}
            value={mnemonicSeed.ninthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                ninthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 4
          </label>

          <input
            type={type}
            value={mnemonicSeed.fourthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                fourthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 10
          </label>

          <input
            type={type}
            value={mnemonicSeed.tenthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                tenthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 5
          </label>

          <input
            type={type}
            value={mnemonicSeed.fifthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                fifthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 11
          </label>

          <input
            type={type}
            value={mnemonicSeed.eleventhWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                eleventhWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 6
          </label>

          <input
            type={type}
            value={mnemonicSeed.sixthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                sixthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
            #Word 12
          </label>

          <input
            type={type}
            value={mnemonicSeed.twelfthWord}
            onChange={(e) => {
              setMnemonicSeed({
                ...mnemonicSeed,
                twelfthWord: e.target.value,
              });
            }}
            className="block mb-12 mt-1 p-3 pl-12 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default MnemonicImport;
