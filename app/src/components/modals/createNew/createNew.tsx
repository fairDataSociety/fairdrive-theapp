import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './createNewStyles';
import TextField from '../../textField/textField';
import Modal from '../modal/modal';

export interface Props {
  type: string;
  isRefLink?: boolean;
  handleClick: () => Promise<void>;
  handleClose: () => void;
  setProp?: (data: string) => void;
  propValue: string;
}

export function CreateNew(props: Props): JSX.Element {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      handleClose={props.handleClose}
      heading={`Create New ${props.type}`}
      icon={true}
      button="Create"
      handleClick={props.handleClick}
    >
      {!props.isRefLink ? (
        <div>
          <p className={classes.label}>Name your {props.type}</p>
          <TextField
            placeholder={`${props.type} Name`}
            setProp={props.setProp}
            type="text"
            propValue={props.propValue}
          ></TextField>
          <p>You are about to create a new {props.type}</p>
        </div>
      ) : (
        <div>
          <p className={classes.label}>Paste your Link</p>
          <TextField
            placeholder={`${props.type} Link`}
            setProp={(data) => props.setProp(data)}
            propValue={props.propValue}
            type="text"
          ></TextField>
          <p>You are about to import a new {props.type}</p>
        </div>
      )}
    </Modal>
  );
}

export default React.memo(CreateNew);
