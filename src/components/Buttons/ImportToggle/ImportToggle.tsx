import { FC } from 'react';

interface ImportToggleProps {
  importMethod: string;
  updateImportMethod: (method: string) => void;
}

const ImportToggle: FC<ImportToggleProps> = ({
  importMethod,
  updateImportMethod,
}) => {
  const activeClass =
    'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar bg-color-shade-dark-4-day dark:bg-color-shade-dark-1-night effect-style-soft-purple-shadow z-30';

  const inactiveClass =
    'text-color-accents-plum-black dark:text-color-accents-grey-cloud bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night effect-style-small-button-drop-shadow z-10';

  return (
    <div className="flex justify-center items-center w-full mb-14 text-center">
      <button
        className={`${
          importMethod === 'address' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-l`}
        onClick={() => updateImportMethod('address')}
      >
        Address
      </button>

      <button
        className={`${
          importMethod === 'mnemonic' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-r`}
        onClick={() => updateImportMethod('mnemonic')}
      >
        Mnemonic
      </button>
    </div>
  );
};

export default ImportToggle;
