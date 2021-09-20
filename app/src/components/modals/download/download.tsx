import React, { useContext } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './downloadStyles';
import Modal from '../modal/modal';
import TextField from '../../textField/textField';

export interface Props {
  setProp: (data: string) => void;
  type: string;
  propValue: string;
}

export function Download(props: Props) {
  const { theme } = useTheme();

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading={`Download ${props.type}`} icon={true} button="Download">
      <p className={classes.label}>Destination</p>
      <TextField
        placeholder={`Choose Destination on your local storage`}
        setProp={props.setProp}
        type="text"
        propValue={props.propValue}
      ></TextField>
      <p>{`You are about to download this ${props.type}`}</p>
    </Modal>
  );
}
