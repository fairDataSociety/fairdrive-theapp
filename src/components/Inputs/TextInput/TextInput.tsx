import { FC } from 'react';

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  updateValue?: (value: string) => void;
  disabled?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  value,
  updateValue,
  disabled,
}) => {
  return (
    <div className="w-full mb-6">
      <label className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase">
        {label}
      </label>

      <input
        type="text"
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e) => updateValue && updateValue(e.target.value)}
        className="block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
