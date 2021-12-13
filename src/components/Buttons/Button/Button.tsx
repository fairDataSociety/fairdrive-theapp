import { FC, useContext, ReactNode } from 'react';

import ThemeContext from '@context/ThemeContext';

interface ButtonProps {
  variant:
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-outlined';
  text: string;
  icon?: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ variant, text, icon, className }) => {
  const { theme } = useContext(ThemeContext);

  const getVariantStyling = () => {
    switch (variant) {
      case 'primary':
        return (
          'py-3 px-8 bg-color-shade-dark-4-day dark:bg-color-accents-purple-black text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-base' +
          ' ' +
          (theme === 'light'
            ? 'effect-style-small-button-drop-shadow'
            : 'shadow-none')
        );
      case 'primary-outlined':
        return 'py-3 px-8 bg-none border border-color-accents-purple-heavy dark:border-color-accents-plum-black text-color-accents-purple-heavy text-base';
      case 'secondary':
        return 'py-3 px-8 bg-color-shade-white-night dark:bg-color-shade-dark-1-night text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-base';
      case 'tertiary':
        return 'py-2 px-3 text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-xs';
      case 'tertiary-outlined':
        return 'py-2 px-3 bg-none border border-color-accents-purple-heavy dark:border-color-accents-plum-black text-color-accents-purple-heavy text-xs';
    }
  };

  return (
    <button
      className={`${className} ${getVariantStyling()} text-center rounded`}
    >
      {text}
      <span>{icon}</span>
    </button>
  );
};

export default Button;
