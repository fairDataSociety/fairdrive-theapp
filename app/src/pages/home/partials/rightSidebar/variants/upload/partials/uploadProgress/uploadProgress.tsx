import React, { useContext } from 'react';

// Contexts
import { FileProviderContext } from 'src/machines/file';
import { FileUploadProgress } from 'src/machines/file/machine';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './uploadProgressStyles';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import { Fail, Success } from 'src/components/icons/icons';

function UploadQueryWithProgress() {
  const { FileMachineStore, FileMachineActions } =
    useContext(FileProviderContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  // TODO: Fix upload progresses
  // const findUploadStatusForRequestID = (requestID: string) => {
  //   const statuses = state.fileUploadedStatus;
  //   const findStatus = statuses.find(
  //     (status) => status.requestId === requestID
  //   );
  //   if (findStatus) {
  //     return findStatus.status;
  //   }
  // };

  const onCancel = (request: FileUploadProgress) => {
    console.log('onCancel in uploadProgress');
    FileMachineActions.onCancelUpload(request.requestId, request.filename);
  };

  return (
    <div>
      {FileMachineStore.context.uploadingProgress.map((request) => {
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
                onClick={() => onCancel(request)}
              >
                {/* {findUploadStatusForRequestID(request.requestId) ===
                  'success' &&
                  complete() && <Success className={classes.successIcon} />}
                {findUploadStatusForRequestID(request.requestId) ===
                  'failed' && <Fail className={classes.cancelIcon} />} */}
                Cancel It
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(UploadQueryWithProgress);
