import React, { useContext } from "react";
import { StoreContext } from "../../store/store";
import useStyles from "./uploadModalProgressStyles";
import LinearProgress from '@material-ui/core/LinearProgress';
export interface Props {

}

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

function UploadModalProgress(props: Props) {
  const { state, actions } = useContext(StoreContext);

  const classes = useStyles({ ...props });

  if (!state.fileUploadProgress || !state.fileUploadProgress.length) {
    return null;
  }


  return (
    <div>
      {state.fileUploadProgress.map(request => {
        const percentage = Math.ceil(request.progressEvent.loaded * 100 / request.progressEvent.total);
        return <div key={request.requestId} className={classes.progressItem}>
          <div className={classes.percentage}>
            {percentage}% of {bytesToSize(request.progressEvent.total)}
          </div>
          <div>
            <LinearProgress variant="determinate" value={percentage} />
          </div>
          <div>
            <a onClick={() => {
              request.cancelFn.cancel();
              actions.cancelUpload(request.requestId)
            }}>Cancel</a>
          </div>  
        </div>
      })}
    </div>
  );
}

export default React.memo(UploadModalProgress);
