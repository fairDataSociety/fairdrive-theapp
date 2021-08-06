import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
// import { StoreContext } from '../../store/store';
import useStyles from './createNewStyles';
import TextField from '../textField/textField';
import ButtonPill from '../buttonPill/buttonPill';

export interface Props {
  onClick: () => Promise<void>;
  label: string;
  title: string;
  setProp: React.Dispatch<any>;
  propValue: string | null;
}

function CreateNew(props: Props): JSX.Element {
  // const { state, actions } = useContext(Sto  reContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.NewCard}>
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Body}>
        {props.label}
        <TextField
          placeholder="Enter here..."
          setProp={props.setProp}
          type="text"
          propValue={props.propValue}
        ></TextField>
        <ButtonPill clickFunction={props.onClick} text="Confirm"></ButtonPill>
      </div>
    </div>
  );
}

export default React.memo(CreateNew);
