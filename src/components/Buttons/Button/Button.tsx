import { FC } from 'react';

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button className="py-3 px-8 text-center text-base bg-color-shade-white-night text-color-accents-purple-black rounded">
      {text}
    </button>
  );
};

export default Button;
