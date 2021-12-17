import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './uploadProgressStyles';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  progress: number;
}

function UploadProgress(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  const { progress } = props;

  return (
    <LinearProgress
      className={classes.progressLine}
      classes={{
        root: classes.progressRoot,
        bar: classes.progressBar,
      }}
      variant="determinate"
      value={progress}
    />
  );
}

export default React.memo(UploadProgress);
