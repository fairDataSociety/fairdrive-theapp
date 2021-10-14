import React, { useContext } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
// import { StoreContext } from '../../../store/store';
import useStyles from './connectToFairdriveStyles';
import Modal from '../modal/modal';
import TextField from 'src/components/textField/textField';

export interface Props {
  setProp: (data: string) => void;
  propValue: string;
}

function ConnectToFairdrive(props: Props) {
  // const { state, actions } = useContext(StoreContext);
  const { theme } = useTheme();

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal heading="Connect to Fairdrive" button="Authorize">
      <p className={classes.label}>USERNAME</p>
      <TextField
        placeholder={`Enter here...`}
        setProp={props.setProp}
        type="text"
        propValue={props.propValue}
      ></TextField>
      <p className={classes.label}>PASSWORD</p>
      <TextField
        placeholder={`Enter here...`}
        setProp={props.setProp}
        type="text"
        propValue={props.propValue}
      ></TextField>
    </Modal>
  );
}

export default React.memo(ConnectToFairdrive);
