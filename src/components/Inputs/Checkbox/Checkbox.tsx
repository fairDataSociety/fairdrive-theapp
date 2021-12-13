import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import CheckLightIcon from '@media/UI/check-light.svg';
import CheckDarkIcon from '@media/UI/check-dark.svg';

import classes from './Checkbox.module.scss';

interface CheckboxProps {
  name: string;
  value: string;
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ name, label }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative">
      <input
        name={label.toLocaleLowerCase()}
        id={name}
        type="checkbox"
        value={name}
        className={`${classes.checkbox} absolute top-4 left-1 w-6 h-6 opacity-0 cursor-pointer`}
      />
      <div className="flex justify-start items-center">
        <div
          className={`inline-flex justify-center items-center w-6 h-6 ml-1 mr-3 border-2 border-color-accents-plum-black dark:border-color-accents-purple-heavy rounded`}
        >
          {theme === 'light' ? (
            <CheckLightIcon className={`${classes.checkIcon} hidden`} />
          ) : (
            <CheckDarkIcon className={`${classes.checkIcon} hidden`} />
          )}
        </div>
        <label
          htmlFor={name}
          className="w-96 font-mulish font-normal text-color-accents-plum-black dark:text-color-accents-soft-lavender text-base tracking-wider cursor-pointer"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
