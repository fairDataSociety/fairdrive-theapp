import { useLocales } from '@context/LocalesContext';
import { FC } from 'react';

interface ImportToggleProps {
  importMethod: string;
  updateImportMethod: (method: string) => void;
}

const ImportToggle: FC<ImportToggleProps> = ({
  importMethod,
  updateImportMethod,
}) => {
  const { intl } = useLocales();

  const activeClass =
    'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar bg-color-shade-dark-4-day dark:bg-color-shade-dark-1-night effect-style-soft-purple-shadow';

  const inactiveClass =
    'text-color-accents-plum-black dark:text-color-accents-grey-cloud bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night effect-style-small-button-drop-shadow';

  return (
    <div className="flex justify-center items-center w-full mb-14 text-center">
      <button
        className={`${
          importMethod === 'address' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-l`}
        onClick={() => updateImportMethod('address')}
      >
        {intl.get('ADDRESS')}
      </button>

      <button
        className={`${
          importMethod === 'mnemonic' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-r`}
        onClick={() => updateImportMethod('mnemonic')}
      >
        {intl.get('MNEMONIC')}
      </button>
    </div>
  );
};

export default ImportToggle;
