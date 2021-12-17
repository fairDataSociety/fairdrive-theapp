import { CancelTokenSource } from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { FileProviderContext } from 'src/machines/file';
import { createTable } from 'src/services/kv';
import { uploadCSV } from 'src/services/kv/upload';
import useStyles from './uploadCSVStyles';
import UploadDropzone from '../upload/partials/uploadIndicatorBlock/uploadIndicatorBlock';
import UploadQueue from '../upload/partials/uploadQueue/uploadQueue';
import UploadProgress from './partials/uploadProgress/uploadProgress';
import { openTable } from 'src/services/kv/open';
import TextField from 'src/components/textField/textField';

interface UploadState {
  files: File[];
  uploading: File;
  cancelFn: CancelTokenSource;
  progress: number;
}

enum ACTIONS {
  UPLOAD_STARTED,
  SET_CANCEL_FN,
  UPDATE_PROGRESS,
  UPLOAD_COMPLETED,
  REMOVE_FILE,
}

type Action =
  | { type: ACTIONS.UPDATE_PROGRESS; data: number }
  | { type: ACTIONS.SET_CANCEL_FN; data: CancelTokenSource }
  | { type: ACTIONS.UPLOAD_STARTED; data: File }
  | { type: ACTIONS.UPLOAD_COMPLETED; data: null }
  | { type: ACTIONS.REMOVE_FILE; data: number };

function removeFileAction(state: UploadState, index: number): UploadState {
  const { uploading, files, cancelFn } = state;
  const stateCopy = { ...state };

  if (uploading === files[index]) {
    if (cancelFn) {
      cancelFn.cancel();
    }
    stateCopy.uploading = null;
    stateCopy.cancelFn = null;
  }

  stateCopy.files = [...files];
  stateCopy.files.splice(index, 1);
  return stateCopy;
}

function reducer(state: UploadState, { type, data }: Action): UploadState {
  switch (type) {
    case ACTIONS.UPLOAD_STARTED:
      return {
        ...state,
        files: [data as File, ...state.files],
        uploading: data as File,
        progress: 0,
        cancelFn: null,
      };
    case ACTIONS.SET_CANCEL_FN:
      return { ...state, cancelFn: data as CancelTokenSource };
    case ACTIONS.UPDATE_PROGRESS:
      return { ...state, progress: data as number };
    case ACTIONS.UPLOAD_COMPLETED:
      return { ...state, uploading: null };
    case ACTIONS.REMOVE_FILE:
      return removeFileAction(state, data as number);
    default:
      throw new Error('Action not supported');
  }
}

const initialState: UploadState = {
  files: [],
  uploading: null,
  cancelFn: null,
  progress: 0,
};

function UploadCSVVariant() {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });
  const { FileMachineStore } = useContext(FileProviderContext);
  const [{ files, uploading, progress }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [tableName, setTableName] = useState<string>('');

  const directory = FileMachineStore.context.currentDirectory;
  const podName = FileMachineStore.context.currentPodName;

  const upload = async (file: File) => {
    try {
      dispatch({ type: ACTIONS.UPLOAD_STARTED, data: file });

      await createTable(podName, tableName);

      await openTable(podName, tableName);

      await uploadCSV(
        {
          file,
          podName,
          tableName,
        },
        (requestId: string, cancelFn: CancelTokenSource) => {
          dispatch({ type: ACTIONS.SET_CANCEL_FN, data: cancelFn });
        },
        (requestId: string, progressEvent: ProgressEvent) => {
          dispatch({
            type: ACTIONS.UPDATE_PROGRESS,
            data: progressEvent.loaded / progressEvent.total,
          });
        }
      );
    } catch (error) {
      // TODO Handle errors
      console.error(error);
    } finally {
      dispatch({ type: ACTIONS.UPLOAD_COMPLETED, data: null });
    }
  };

  const addFiles = (files: File[]) => {
    if (uploading || !tableName) {
      return;
    }
    upload(files[0]);
  };

  const removeFile = (index: number) => {
    dispatch({ type: ACTIONS.REMOVE_FILE, data: index });
  };

  return (
    <>
      <div>
        <UploadDropzone setFilesToUpload={addFiles} accept="text/csv" />
      </div>
      <div className={classes.tableName}>
        <TextField
          className={classes.tableNameInput}
          placeholder="Table Name"
          type="text"
          setProp={setTableName}
          propValue={tableName}
        />
      </div>
      <div className={classes.progressWrapper}>
        {uploading && <UploadProgress progress={progress * 100} />}
      </div>
      <div>
        <UploadQueue
          selectedFiles={files}
          directory={directory}
          podName={podName}
          removeFile={removeFile}
        />
      </div>
    </>
  );
}

export default React.memo(UploadCSVVariant);
