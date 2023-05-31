import { FC } from 'react';

interface DisabledInputProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
}

const DisabledInput: FC<DisabledInputProps> = ({
  name,
  label,
  placeholder,
  value,
}) => {
  return (
    <div className="w-full mb-6">
      <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        disabled={true}
        className="block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DisabledInput;
