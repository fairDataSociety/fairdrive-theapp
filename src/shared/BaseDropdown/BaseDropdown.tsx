import React, { useContext, useState, useEffect } from 'react';
import ClickAwayListener from 'react-click-away-listener';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseDropdownStyles';

// Helpers
import { isValueInEnum } from 'src/helpers/isValueInEnum';

// Types
interface DropdownOption {
  label: string;
  isDisabled?: boolean;
  isDangerVariant?: boolean;
  onOptionClicked?: () => void;
}

export enum DROPDOWN_SIZE {
  REGULAR = 'regular',
  BIG = 'big',
}

export interface Props {
  option?: string;
  optionsList?: DropdownOption[];
  isDisabled?: boolean;
  moveToRight?: boolean;
  title?: string;
  dropdownSize?: DROPDOWN_SIZE;
  children: (
    openDropdown: () => void,
    isDisabled: boolean,
    isDropdownOpen: boolean
  ) => JSX.Element;
  contentBlock?: () => JSX.Element;
  footerBlock?: () => JSX.Element;
}

function BaseDropdown(props: Props): JSX.Element {
  const {
    option,
    optionsList,
    isDisabled,
    title,
    children,
    contentBlock,
    footerBlock,
    moveToRight,
    dropdownSize = DROPDOWN_SIZE.REGULAR,
  } = props;

  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);

  useEffect(() => {
    if (props.contentBlock && props.optionsList) {
      console.warn(
        'contentBlock and optionsList can not being defined in same time'
      );
    }
  }, [props]);

  useEffect(() => {
    isValueInEnum(dropdownSize, DROPDOWN_SIZE);
  }, [dropdownSize]);

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
            ${dropdownSize === DROPDOWN_SIZE.REGULAR ? classes.sizeRegular : ''}
            ${dropdownSize === DROPDOWN_SIZE.BIG ? classes.sizeBig : ''}
            `}
          >
            {title && (
              <div className={classes.dropdownHeaderWrapper}>
                <p className={classes.dropdownHeading}>{title}</p>
                {option && (
                  <p className={classes.dropdownCurrentOption}>{option}</p>
                )}
              </div>
            )}
            {optionsList && (
              <ul>
                {optionsList.map((option, index) => (
                  <li
                    key={index}
                    className={`
                      ${classes.dropdownItem} 
                      ${option.isDisabled ? classes.dropdownItemDisabled : ''}
                      ${
                        option.isDangerVariant
                          ? classes.dropdownItemDangerVariant
                          : ''
                      } 
                    `}
                    onClick={() => option.onOptionClicked()}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}

            {contentBlock && contentBlock()}

            {footerBlock && (
              <div className={classes.dropdownFooter}>{footerBlock()}</div>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default React.memo(BaseDropdown);
