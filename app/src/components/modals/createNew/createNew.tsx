import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../../store/themeContext/themeContext';
import useStyles from './createNewStyles';
import TextField from '../../textField/textField';
import Modal from '../modal/modal';
export interface Props {
  type: string;
  isRefLink?: boolean;
  handleClick: () => Promise<void>;
  handleClose: () => void;
  setProp?: React.Dispatch<React.SetStateAction<string>>;
  propValue: string;
}

export const CreateNew = forwardRef<HTMLDivElement, Props>(
  (props, ref): JSX.Element => {
    const { theme } = useContext(ThemeContext);

    const classes = useStyles({ ...props, ...theme });

    return (
      <Modal
        ref={ref}
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
              setProp={props.setProp}
              propValue={props.propValue}
              type="text"
            ></TextField>
            <p>You are about to import a new {props.type}</p>
          </div>
        )}
      </Modal>
    );
  }
);

CreateNew.propTypes = {
  type: PropTypes.string.isRequired,
  isRefLink: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setProp: PropTypes.func,
  propValue: PropTypes.string.isRequired,
};

export default React.memo(CreateNew);
