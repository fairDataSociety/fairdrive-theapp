import React from 'react';

import useStyles from './filePreviewStyles';
import { InfoIcon } from '../icons/icons';

const FilePreviewFallback = (): JSX.Element => {
  const classes = useStyles();

  return <InfoIcon className={classes.Icon} />;
};

export default FilePreviewFallback;
