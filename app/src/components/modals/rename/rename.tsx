import React, { useContext } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './renameStyles';
import Modal from '../modal/modal';
import TextField from 'src/components/textField/textField';

export interface Props {
  type: string;
  setProp: (data: string) => void;
  propValue: string;
}

export function Rename(props: Props) {
  const { theme } = useTheme();

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading={`Rename ${props.type}`} icon={true} button="Save">
      <p className={classes.label}>Name your {props.type}</p>
      <TextField
        placeholder={`${props.type} name`}
        setProp={props.setProp}
        type="text"
        propValue={props.propValue}
      ></TextField>
      <p>{`You are about to rename this ${props.type}`}</p>
    </Modal>
  );
}
