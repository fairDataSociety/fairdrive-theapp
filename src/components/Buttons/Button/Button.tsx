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
  label?: string;
  icon?: ReactNode;
  onClick?: any;
  className?: string;
  padding?: string;
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
  padding,
  children,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);

  const getVariantStyling = () => {
    switch (variant) {
      case 'primary':
        return (
          'bg-color-shade-dark-4-day dark:bg-color-accents-purple-black text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-base' +
          ' ' +
          (theme === 'light'
            ? 'effect-style-small-button-drop-shadow'
            : 'shadow-none') +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'primary-outlined':
        return (
          'bg-none border border-color-accents-purple-heavy dark:border-color-accents-plum-black text-color-accents-purple-heavy text-base' +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'secondary':
        return (
          'bg-color-shade-white-night dark:bg-color-shade-dark-1-night text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-base' +
          ' ' +
          (padding ? '' : 'py-3 px-8')
        );
      case 'tertiary':
        return (
          'text-color-accents-purple-black dark:text-color-accents-grey-lavendar text-xs' +
          ' ' +
          (padding ? '' : 'py-2 px-3')
        );
      case 'tertiary-outlined':
        return (
          'bg-none border border-color-accents-purple-heavy dark:border-color-accents-plum-black text-color-accents-purple-heavy text-xs' +
          ' ' +
          (padding ? '' : 'py-2 px-3')
        );
    }
  };

  const getVariantDisabledStyle = () => {
    if (disabled) {
      switch (variant) {
        case 'primary':
          return 'cursor-not-allowed dark:disabled:bg-color-shade-dark-4-night dark:text-color-shade-light-3-night text-color-shade-light-3-night disabled:bg-color-shade-dark-4-day';
        case 'primary-outlined':
          return 'cursor-not-allowed dark:disabled:border-color-shade-light-3-night dark:disabled:bg-none dark:text-color-shade-light-3-night text-color-shade-light-3-night disabled:border-color-shade-light-3-night';
        case 'secondary':
          return 'cursor-not-allowed dark:text-color-shade-light-2-night bg-none text-color-shade-light-3-night';
        case 'tertiary':
          return 'cursor-not-allowed dark:text-color-shade-light-3-night';
        case 'tertiary-outlined':
          return 'cursor-not-allowed dark:text-color-shade-light-3-night';
      }
    } else return '';
  };
  const getVariantSelectedStyle = () => {
    if (!disabled) {
      switch (variant) {
        case 'primary':
          return (
            'dark:focus:bg-color-accents-plum-black dark:focus:shadow-dark-purple focus:shadow-dark-purple dark:focus:bg-color-shade-dark-4 focus:bg-color-shade-dark-4' +
            ' ' +
            (theme === 'light'
              ? 'effect-style-small-button-drop-shadow'
              : 'shadow-none')
          );
        case 'primary-outlined':
          return 'dark:focus:bg-color-shade-dark-3-night dark:focus:shadow-dark-purple focus:shadow-dark-purple dark:focus:bg-color-shade-dark-4 focus:bg-color-shade-dark-3-day';
        case 'secondary':
          return 'dark:focus:bg-color-shade-dark-1-night dark:focus:shadow-dark-purple focus:shadow-dark-purple dark:focus:bg-color-shade-dark-4 focus:bg-color-shade-white-night';
        case 'tertiary':
          return 'dark:focus:text-base focus:text-base';
        case 'tertiary-outlined':
          return 'dark:focus:bg-color-shade-dark-3-night dark:focus:shadow-dark-purple focus:shadow-dark-purple dark:focus:bg-color-shade-dark-4 focus:bg-color-shade-dark-3-day';
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
      className={`${getVariantStyling()} ${getVariantHoverStyle()} ${getVariantDisabledStyle()} ${getVariantSelectedStyle()} ${className} ${padding} text-center rounded`}
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
