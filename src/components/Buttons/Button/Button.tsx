import { FC, useContext, ReactNode, ReactChild } from 'react';

import ThemeContext from '@context/ThemeContext';

interface ButtonProps {
  type?: 'button' | 'submit';
  variant:
    | 'primary'
    | 'primary-outlined'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-outlined';
  label: string;
  icon?: ReactNode;
  onClick?: any;
  className?: string;
  children?: ReactChild | ReactChild[];
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  variant,
  label,
  icon,
  onClick,
  className,
  children,
  disabled = false,
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

  const getVariantDisabledStyle = () => {
    if (disabled) {
      switch (variant) {
        case 'primary':
          return 'dark:disabled:bg-color-shade-dark-4-night dark:text-color-shade-light-3-night text-color-shade-light-3-night disabled:bg-color-shade-dark-4-day';
        case 'primary-outlined':
          return 'dark:disabled:border-color-shade-light-3-night dark:disabled:bg-none dark:text-color-shade-light-3-night text-color-shade-light-3-night disabled:border-color-shade-light-3-night';
        case 'secondary':
          return 'dark:text-color-shade-light-2-night bg-none text-color-shade-light-3-night';
        case 'tertiary':
          return 'dark:text-color-shade-light-3-night';
        case 'tertiary-outlined':
          return 'dark:text-color-shade-light-3-night';
      }
    } else return '';
  };

  const getVariantHoverStyle = () => {
    if (!disabled) {
      switch (variant) {
        case 'primary':
          return (
            'dark:hover:bg-color-accents-plum-black dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-dark-4' +
            ' ' +
            (theme === 'light'
              ? 'effect-style-small-button-drop-shadow'
              : 'shadow-none')
          );
        case 'primary-outlined':
          return 'dark:hover:bg-color-shade-dark-3-night dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-dark-3-day';
        case 'secondary':
          return 'dark:hover:bg-color-shade-dark-1-night dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-white-night';
        case 'tertiary':
          return 'dark:hover:text-base hover:text-base';
        case 'tertiary-outlined':
          return 'dark:hover:bg-color-shade-dark-3-night dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-dark-3-day';
      }
    } else return '';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${getVariantStyling()} ${getVariantHoverStyle()} ${getVariantDisabledStyle()} text-center rounded`}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <div>
          {label}
          {icon}
        </div>
      )}
    </button>
  );
};

export default Button;
