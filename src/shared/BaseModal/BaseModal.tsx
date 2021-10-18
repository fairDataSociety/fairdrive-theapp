import React from 'react';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseModalStyles';

// Icons
import { Close, Folder } from 'src/components/icons/icons';

// Components
import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
  FONT_SIZE,
} from 'src/shared/BaseButton/BaseButton';

export interface Props {
  title: string;
  textBelowBody?: string;
  isIconShown?: boolean;
  isModalClosable?: boolean;
  isButtonDisabled?: boolean;
  buttonContent?: string;
  onButtonClicked?: () => void;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

function BaseModal(props: Props): JSX.Element {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const onClose = (): void => {
    if (!props.isModalClosable) {
      props.onClose();
    }
  };

  return (
    <>
      <div onClick={() => onClose()} className={classes.overlay} />
      <div className={classes.modal}>
        <div className={classes.header}>
          <div className={classes.titleGroup}>
            <Folder className={classes.folderIcon} />
            <p className={classes.title}>{props.title}</p>
          </div>

          <Close className={classes.closeIcon} onClick={() => onClose()} />
        </div>
        <div className={classes.body}>{props.children}</div>
        {props.textBelowBody && (
          <p className={classes.textBelowBody}>{props.textBelowBody}</p>
        )}

        {props.buttonContent && props.onButtonClicked && (
          <div className={classes.footer}>
            <BaseButton
              variant={BUTTON_VARIANTS.ALTERNATIVE}
              size={BUTTON_SIZE.MEDIUM}
              fontSize={FONT_SIZE.BIG}
              isFluid={false}
              isDisabled={props.isButtonDisabled}
              onClickCallback={() => props.onButtonClicked()}
            >
              {props.buttonContent}
            </BaseButton>
          </div>
        )}
      </div>
    </>
  );
}

export default React.memo(BaseModal);
