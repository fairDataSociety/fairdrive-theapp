import { FC } from 'react';

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button className="w-full mt-10 py-3 px-16 text-center bg-color-shade-white-night rounded">
      {text}
    </button>
  );
};

export default Button;
