import { FC, useContext, ReactNode, ReactChild } from 'react';

import ThemeContext from '@context/ThemeContext';

interface ButtonProps {
  variant:
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-outlined';
  type?: 'button' | 'submit';
  text: string;
  icon?: ReactNode;
  onClick?: any;
  className?: string;
  children?: ReactChild | ReactChild[];
}

const Button: FC<ButtonProps> = ({
  variant,
  type,
  text,
  icon,
  onClick,
  className,
  children,
}) => {
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
      type={type || 'button'}
      onClick={onClick}
      className={`${className} ${getVariantStyling()} text-center rounded`}
    >
      {children ? (
        children
      ) : (
        <div>
          {text}
          <span>{icon}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
