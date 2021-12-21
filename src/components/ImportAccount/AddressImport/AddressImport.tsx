/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

interface AddressImportProps {
  type: 'text';
  address: string;
  setAddress: any;
  name: string;
  label: string;
  placeholder?: string;
}

const AddressImport: FC<AddressImportProps> = ({
  type,
  address,
  setAddress,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className="w-full mb-6">
      <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
        {label}
      </label>

      <input
        type={type}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
        value={address}
        className="block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddressImport;
