import { FC } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';

interface AuthenticationInputProps {
  type: 'text' | 'number' | 'email' | 'password';
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  useFormRegister: UseFormRegister<FieldValues>;
  validationRules?: any;
  error?: FieldError;
  errorMessage?: string;
}

const AuthenticationInput: FC<AuthenticationInputProps> = ({
  type,
  id,
  name,
  label,
  placeholder,
  defaultValue,
  useFormRegister,
  validationRules,
  error,
  errorMessage,
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
        {...useFormRegister(name, validationRules)}
      />

      {error ? (
        <div className="mt-1 text-color-status-negative-day text-xs leading-none">
          {errorMessage || error.message}
        </div>
      ) : null}
    </div>
  );
};

export default AuthenticationInput;
