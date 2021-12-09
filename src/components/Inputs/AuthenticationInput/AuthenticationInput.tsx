import { FC } from 'react';

interface AuthenticationInputProps {
  label: string;
  id: string;
  type: 'text' | 'number' | 'email' | 'password';
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
}

const AuthenticationInput: FC<AuthenticationInputProps> = ({
  label,
  id,
  type,
  name,
  defaultValue,
  placeholder,
}) => {
  return (
    <div className="w-full mb-6">
      <label
        htmlFor={id}
        className="text-xxs text-text-color-accents-purple-black uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={defaultValue}
        className="block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day effect-style-small-button-drop-shadow rounded"
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
};

export default AuthenticationInput;
