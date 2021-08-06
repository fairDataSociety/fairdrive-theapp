import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import useStyles from './fileListStyles';
import { Kebab } from '../icons/icons';

export interface Props {
  file: any;
  name: any;
  type: any;
  size: any;
  created: any;
  modified: any;
  isPodBarOpen: boolean;
}
function FileListBody(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  // const { name, type, size, created, modified } = props.file;
  return (
    <div className={classes.fileWrapper}>
      <div className={classes.fileName}>{props.name}</div>
      <div className={classes.fileInfo}>{props.type}</div>
      <div className={classes.fileInfo}>{props.size}</div>
      <div className={classes.fileInfo}>{props.created}</div>
      <div className={classes.fileInfo}>{props.modified}</div>
      <Kebab />
    </div>
  );
}

export default React.memo(FileListBody);
