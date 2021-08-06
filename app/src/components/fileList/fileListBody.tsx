import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import useStyles from './fileListStyles';
import { Kebab } from '../icons/icons';

import { IFile } from "../../types/models/File";
import { IDirectory } from "../../types/models/Directory";
export interface Props {
  file: IFile | IDirectory;
  name: string;
  type: string;
  size: string;
  created: string;
  modified: string;
  isPodBarOpen: boolean;
}
function FileListBody(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

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
