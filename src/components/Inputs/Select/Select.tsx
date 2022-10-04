import { FC } from 'react';

import classes from './Select.module.scss';

interface SelectProps {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  updateValue: (value: string) => void;
}

const Select: FC<SelectProps> = ({ name, options, updateValue }) => {
  return (
    <select
      name={name}
      className={`${classes.select} w-100% cursor-pointer`}
      onChange={(e) => updateValue(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
