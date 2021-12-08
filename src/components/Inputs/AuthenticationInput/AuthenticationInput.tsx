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
        className="mb-2 text-style-10-overline text-color-accents-plum-black uppercase"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={defaultValue}
        className="block w-full py-3 pl-3 rounded bg-color-shade-dark-4-day effect-style-small-button-drop-shadow"
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
};

export default AuthenticationInput;
