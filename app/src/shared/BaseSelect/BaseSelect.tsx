import React, { useState, useContext } from 'react';
import { ChevronDown } from 'src/components/icons/icons';
import { ClickAwayListener } from '@material-ui/core';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './BaseSelectStyles';
import DropDown from 'src/components/dropDown/dropDown';

interface Option {
  id: number;
  label: string;
}

interface Props {
  option: number;
  changeOption: (data: number) => void;
  options: Option[];
}

export const BaseSelect = (props: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });
  const [isSelectExpanded, setIsSelectExpanded] = useState(false);

  const findLabelForSelectedOption = () => {
    const search = props.options.find((option) => option.id === props.option);
    return search ? search.label : null;
  };

  return (
    <div className={classes.selectWrapper}>
      <button
        className={classes.button}
        onClick={() => setIsSelectExpanded(true)}
      >
        {findLabelForSelectedOption()}
        <ChevronDown className={classes.indicatorIcon} />
      </button>
      {isSelectExpanded && (
        <ClickAwayListener onClickAway={() => setIsSelectExpanded(false)}>
          <div className={classes.dropdown}>
            <DropDown variant="tertiary" heading="Activity Coming Soon">
              <ul>
                {props.options.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => props.changeOption(option.id)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </DropDown>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
