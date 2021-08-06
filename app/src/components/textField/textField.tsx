import React, { useContext } from 'react';
import { useEffect } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
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

function TextField(props: Props) {
  const { theme } = useContext(ThemeContext);

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
