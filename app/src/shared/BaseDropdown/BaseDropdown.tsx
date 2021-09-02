import React, { useContext, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseDropdownStyles';

// Types

interface DropdownOption {
  label: string;
  onOptionClicked?: () => void;
}

export interface Props {
  option?: string;
  optionsList: DropdownOption[];
  isDisabled?: boolean;
  moveToRight?: boolean;
  children: (
    openDropdown: () => void,
    isDisabled: boolean,
    isDropdownOpen: boolean
  ) => JSX.Element;
}

function BaseDropdown(props: Props): JSX.Element {
  const { optionsList, isDisabled, children, moveToRight } = props;

  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);

  return (
    <div className={classes.dropdownWrapper}>
      {children(openDropdown, isDisabled, isDropdownOpen)}
      {isDropdownOpen && (
        <ClickAwayListener onClickAway={() => setIsDropdownOpen(false)}>
          <div
            className={`
            ${classes.dropdown} 
            ${isDropdownOpen ? classes.dropdownOpen : ''}
            ${moveToRight ? classes.dropdownMoveToRight : ''}
            `}
          >
            {/* TODO: Display currently selected option */}
            <ul>
              {optionsList.map((option, index) => (
                <li
                  key={index}
                  className={classes.dropdownItem}
                  onClick={() => option.onOptionClicked()}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default React.memo(BaseDropdown);
