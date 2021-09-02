import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseButtonStyles';

// Helpers
import { isValueInEnum } from 'src/helpers/isValueInEnum';

// Icons
import { ChevronRight } from 'src/components/icons/icons';

export enum BUTTON_VARIANTS {
  PRIMARY = 'primary',
  PRIMARY_OUTLINED = 'primary_outlined',
  ALTERNATIVE = 'alternative',
  TERITARY = 'teritary',
  TERITARY_OUTLINED = 'teritary_outlined',
  ACTION_OUTLINED = 'action_outlined',
}

export enum BUTTON_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

export interface Props {
  showIcon?: boolean;
  isDisabled?: boolean;
  isSubmit?: boolean;
  isFluid?: boolean;
  onClickCallback: () => void;
  children: string;
  size: BUTTON_SIZE;
  variant: BUTTON_VARIANTS;
}

export const BaseButton = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZE.MEDIUM,
  showIcon,
  isDisabled,
  isFluid,
  isSubmit,
  onClickCallback,
  children,
}: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({
    ...{
      variant,
      size,
      showIcon,
      isFluid,
      isDisabled,
      isSubmit,
      onClickCallback,
      children,
    },
    ...theme,
  });

  useEffect(() => {
    isValueInEnum(variant, BUTTON_VARIANTS);
    isValueInEnum(size, BUTTON_SIZE);
  }, [variant, size]);

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={() => onClickCallback()}
      disabled={isDisabled}
      className={`${classes.button} ${classes[variant]} ${classes[size]} ${
        isFluid ? classes.fluid : ''
      }`}
    >
      {children}
      {showIcon && <ChevronRight className={classes.icon} />}
    </button>
  );
};
