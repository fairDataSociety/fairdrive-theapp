import React, { useContext, useState, useRef, useEffect } from 'react';
import useStyles from './BaseInputStyles';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { Copy, Success, Fail } from 'src/components/icons/icons';

export interface Props {
  id: string;
  initialValue?: string;
  isDisabled?: boolean;
  onChange?: (data: string) => void;
  label?: string;
  placeholder?: string;
  turnOnValidation?: boolean;
  validationCallback?: (input: string) => 'success' | 'error' | 'none';
  allowForClipboarding?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

function BaseInput(props: Props): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.initialValue ? props.initialValue : '');
  }, [props.initialValue]);

  const [validationState, setValidationState] = useState<
    'success' | 'error' | 'none'
  >('none');

  const [isFocused, setIsFocused] = useState(false);
  const [isCopiedSuccessfuly, setIsCopiedSuccessfuly] = useState(false);

  const onCopyPasteClicked = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopiedSuccessfuly(true);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setTimeout(() => setIsCopiedSuccessfuly(false), 1000);
    }
  };

  const handleOnChange = (data: string) => {
    setValue(data);
    props.onChange(data);
  };

  const onFocus = () => {
    props.turnOnValidation && setValidationState('none');
    setIsFocused(true);
  };

  const onBlur = () => {
    props.turnOnValidation &&
      setValidationState(props.validationCallback(value));
    setIsFocused(false);
  };

  return (
    <div
      className={classes.inputGroupWrapper}
      onClick={() => inputRef.current.focus()}
    >
      <div className={classes.labelWrapper}>
        {props.label && (
          <label htmlFor={props.id} className={classes.label}>
            {props.label}
          </label>
        )}
        {props.turnOnValidation && validationState !== 'none' && (
          <p className={classes.feedbackMessage}>
            {validationState === 'success' && props.successMessage}
            {validationState === 'error' && props.errorMessage}
          </p>
        )}
      </div>
      <div
        className={`
        ${classes.inputWrapper}  
        ${validationState === 'success' ? classes.inputSuccess : ''}
        ${validationState === 'error' ? classes.inputError : ''}
        ${props.isDisabled ? classes.inputWrapperDisabled : ''}
        ${isFocused ? classes.inputWrapperFocus : ''}
      `}
      >
        <input
          id={props.id}
          type="text"
          ref={inputRef}
          value={value}
          className={classes.input}
          disabled={props.isDisabled}
          placeholder={props.placeholder ? props.placeholder : 'Type here'}
          onChange={(data) => handleOnChange(data.target.value)}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
        />
        <div className={classes.inputIcon}>
          {props.allowForClipboarding && validationState === 'none' && (
            <button type="button" onClick={() => onCopyPasteClicked()}>
              {isCopiedSuccessfuly ? (
                <Success className={`${classes.icon} ${classes.iconSuccess}`} />
              ) : (
                <Copy className={classes.icon} />
              )}
            </button>
          )}
          {validationState === 'success' && (
            <Success className={`${classes.icon} ${classes.iconSuccess}`} />
          )}
          {validationState === 'error' && (
            <Fail className={`${classes.icon} ${classes.iconFailed}`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(BaseInput);
