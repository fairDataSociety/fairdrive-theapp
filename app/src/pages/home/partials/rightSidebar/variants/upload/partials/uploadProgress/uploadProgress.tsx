import React, { useContext } from 'react';

// Contexts
import { StoreContext } from 'src/store/store';
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './uploadProgressStyles';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fail, Success } from 'src/components/icons/icons';

function UploadQueryWithProgress() {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useTheme();
  const classes = useStyles({ ...theme });

  const findUploadStatusForRequestID = (requestID: string) => {
    const statuses = state.fileUploadedStatus;
    const findStatus = statuses.find(
      (status) => status.requestId === requestID
    );
    if (findStatus) {
      return findStatus.status;
    }
  };

  return (
    <div>
      {state.fileUploadProgress.map((request) => {
        const percentage = Math.ceil(
          (request.progressEvent.loaded * 100) / request.progressEvent.total
        );

        const complete = () => percentage === 100;

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
              <button
                type="button"
                className={classes.actionContainer}
                disabled={complete()}
                onClick={() => {
                  request.cancelFn.cancel();
                  actions.cancelUpload(request.requestId);
                }}
              >
                {findUploadStatusForRequestID(request.requestId) ===
                  'success' &&
                  complete() && <Success className={classes.successIcon} />}
                {findUploadStatusForRequestID(request.requestId) ===
                  'failed' && <Fail className={classes.cancelIcon} />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(UploadQueryWithProgress);
