import React from 'react';

import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './BaseButtonGroupStyles';

// Components
import {
  BaseButton,
  Props as ButtonProps,
  BUTTON_BORDER_RADIUS,
} from 'src/shared/BaseButton/BaseButton';

type ButtonPropsWithContent = ButtonProps & { content: string };

export interface Props {
  buttons: ButtonPropsWithContent[];
}

function BaseButtonGroup(props: Props): JSX.Element {
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const getProperBorderRadius = (
    index: number,
    arrayLenght: number
  ): BUTTON_BORDER_RADIUS => {
    if (index === 0) {
      return BUTTON_BORDER_RADIUS.LEFT;
    } else if (index === arrayLenght) {
      return BUTTON_BORDER_RADIUS.RIGHT;
    } else {
      return BUTTON_BORDER_RADIUS.NO;
    }
  };

  return (
    <div className={classes.wrapper}>
      {props.buttons.map((button, index) => (
        <BaseButton
          {...button}
          key={index}
          isFluid={true}
          borderRadius={getProperBorderRadius(index, props.buttons.length)}
        >
          {button.content}
        </BaseButton>
      ))}
    </div>
  );
}

export default React.memo(BaseButtonGroup);
