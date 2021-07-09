import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import useStyles from './textFieldStyles';

export interface Props {
  placeholder: string;
  setProp: any;
  setHasError?: any;
  onContinue?: any;
  type: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

function TextField(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const handleSetProp = (e: any) => {
    props.setProp(e.target.value);
    // props.setHasError(false);
  };

  function handleSubmit(e: any) {
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
        disabled={props.disabled}
      ></input>
    </div>
  );
}

export default React.memo(TextField);
