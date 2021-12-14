import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface AuthenticationInputProps {
  label: string;
  id: string;
  type: 'text' | 'number' | 'email' | 'password';
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  useFormRegister: UseFormRegister<FieldValues>;
}

const AuthenticationInput: FC<AuthenticationInputProps> = ({
  label,
  id,
  type,
  name,
  defaultValue,
  placeholder,
  useFormRegister,
}) => {
  return (
    <div className="w-full mb-6">
      <label
        htmlFor={id}
        className="text-xs text-color-accents-purple-black dark:text-color-shade-white-night uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={defaultValue}
        className="block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
        placeholder={placeholder}
        {...useFormRegister(name)}
      />
    </div>
  );
};

export default AuthenticationInput;
