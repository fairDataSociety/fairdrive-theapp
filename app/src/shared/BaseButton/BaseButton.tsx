import React, { useContext, useEffect } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';

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
  NO_PADDING = 'no_padding',
}

export enum FONT_SIZE {
  REGULAR = 'font_regular',
  BIG = 'font_big',
}

export enum BUTTON_TEXT_COLOR {
  WHITE = 'font_color_white',
  LIGHT1 = 'font_color_light1',
  LIGHT2 = 'font_color_light2',
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
  fontSize?: FONT_SIZE;
  textColor?: BUTTON_TEXT_COLOR;
}

export const BaseButton = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZE.MEDIUM,
  fontSize = FONT_SIZE.REGULAR,
  showIcon,
  isDisabled,
  isFluid,
  textColor,
  isSubmit,
  onClickCallback,
  children,
}: Props): JSX.Element => {
  const { theme } = useTheme();

  const classes = useStyles({
    ...{
      variant,
      size,
      showIcon,
      isFluid,
      isDisabled,
      textColor,
      isSubmit,
      fontSize,
      onClickCallback,
      children,
    },
    ...theme,
  });

  useEffect(() => {
    isValueInEnum(variant, BUTTON_VARIANTS);
    isValueInEnum(size, BUTTON_SIZE);
    if (fontSize) {
      isValueInEnum(fontSize, FONT_SIZE);
    }
    if (textColor) {
      isValueInEnum(textColor, BUTTON_TEXT_COLOR);
    }
  }, [variant, size, fontSize, textColor]);

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={() => onClickCallback()}
      disabled={isDisabled}
      className={`
        ${classes.button} 
        ${classes[variant]} 
        ${classes[size]} 
        ${classes[fontSize]} 
        ${textColor ? classes[textColor] : ''}
        ${isFluid ? classes.fluid : ''}
      
      `}
    >
      {children}
      {showIcon && <ChevronRight className={classes.icon} />}
    </button>
  );
};
