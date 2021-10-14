import React, { useContext } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from './addLinkStyles';
import Modal from '../modal/modal';
import TextField from '../../textField/textField';

export interface Props {
  setProp: (data: string) => void;
  propValue: string;
}

function AddLink(props: Props) {
  const { theme } = useTheme();

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      heading="Add Link/Pod"
      icon={true}
      button="Confirm"
      confirmMessage="You are about to confirm this link."
    >
      <p className={classes.label}>Link shared with you</p>

      <TextField
        placeholder={`Paste link here`}
        setProp={props.setProp}
        type="text"
        propValue={props.propValue}
      ></TextField>
      <input className={classes.input} placeholder="Paste link here" />
    </Modal>
  );
}

export default React.memo(AddLink);
