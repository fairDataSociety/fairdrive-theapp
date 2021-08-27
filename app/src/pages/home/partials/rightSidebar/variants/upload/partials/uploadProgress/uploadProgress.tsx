import React, { useContext } from 'react';

// Contexts
import { StoreContext } from 'src/store/store';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './uploadProgressStyles';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fail, Success } from 'src/components/icons/icons';

function UploadProgress() {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  if (!state.fileUploadProgress || !state.fileUploadProgress.length) {
    return (
      <span className={classes.percentage}>There are no active uploads</span>
    );
  }

  return (
    <div>
      {state.fileUploadProgress.map((request) => {
        const percentage = Math.ceil(
          (request.progressEvent.loaded * 100) / request.progressEvent.total
        );

        const complete = percentage === 100;

        return (
          <div key={request.requestId} className={classes.progressItem}>
            <div className={classes.percentage}>{request.filename}</div>
            <div className={classes.progressContainer}>
              <LinearProgress
                className={classes.progressLine}
                classes={{
                  root: classes.progressRoot,
                  bar: classes.progressBar,
                }}
                variant="determinate"
                value={percentage}
              />

              <a
                className={classes.actionContainer}
                onClick={() => {
                  request.cancelFn.cancel();
                  actions.cancelUpload(request.requestId);
                }}
              >
                {complete ? (
                  <Success className={classes.successIcon} />
                ) : (
                  <Fail className={classes.cancelIcon} />
                )}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(UploadProgress);
