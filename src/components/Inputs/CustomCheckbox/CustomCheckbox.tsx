import { FC, useContext, ReactNode } from 'react';
import ThemeContext from '@context/ThemeContext';
import CheckLightIcon from '@media/UI/check-light.svg';
import CheckDarkIcon from '@media/UI/check-dark.svg';

import classes from './CustomCheckbox.module.scss';

interface CheckboxProps {
  name: string;
  onChange: any;
  checked: boolean;
  defaultValue?: boolean;
  className?: string;
  children?: ReactNode;
}

const CustomCheckbox: FC<CheckboxProps> = ({
  name,
  onChange,
  checked,
  defaultValue,
  className,
  children,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        id={name}
        type="checkbox"
        value={name}
        checked={checked}
        defaultChecked={defaultValue}
        className={`${classes.checkbox} absolute w-6 h-6 opacity-0 cursor-pointer`}
        onChange={onChange}
      />

      <div className="flex justify-start items-center">
        <div
          className={`inline-flex justify-center items-center w-5 h-5 flex-shrink-0 ml-1 mr-3 border-2 border-color-accents-plum-black dark:border-color-accents-purple-heavy rounded`}
        >
          {theme === 'light' ? (
            <CheckLightIcon className={`${classes.checkIcon} hidden`} />
          ) : (
            <CheckDarkIcon className={`${classes.checkIcon} hidden`} />
          )}
        </div>

        <label
          htmlFor={name}
          className="mr-2 font-normal text-color-accents-plum-black dark:text-color-accents-soft-lavender text-xs"
        >
          {children}
        </label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
