import React from 'react';
import { useEffect } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './textFieldStyles';

export interface Props {
  placeholder: string;
  propValue: string;
  setProp: (data: string) => void;
  setHasError?: (data: boolean) => void;
  onContinue?: () => void;
  type: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  isPropUsername?: boolean;
}

// TODO: Refactor textFiled -> BaseInput, add all variants and features

function TextField(props: Props) {
  const { theme } = useTheme();

  const classes = useStyles({ ...props, ...theme });
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (props.isPropUsername) {
      props.setProp(username);
    }
  });
  const handleSetProp = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setProp(e.target.value);
    // props.setHasError(false);
  };

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (props.onContinue) {
      if (e.charCode === 13) {
        props.onContinue();
      }
    }
  }
  return (
    <div>
      <input
        autoFocus={props.autoFocus}
        className={`${classes.TextField} ${props.className}`}
        type={props.type}
        placeholder={props.placeholder}
        onKeyPress={(e) => handleSubmit(e)}
        onChange={(e) => handleSetProp(e)}
        value={props.propValue}
        disabled={props.disabled}
      ></input>
    </div>
  );
}

export default React.memo(TextField);
