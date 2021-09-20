enum STATES {
  STATE_ROOT = 'podMachine',
  IDLE = 'idle',
  DIRECTORY = 'directory',
  DIRECTORY_LOADING = 'directory_loading',
  DIRECTORY_SUCCESS = 'directory_success',
  DIRECTORY_FAILED = 'directory_failed',
  FILE_UPLOADING = 'file_uploading',
  FILE_UPLOAD_SUCCESS = 'file_upload_success',
  FILE_UPLOAD_ERROR = 'file_upload_error',
  FILE_REMOVING = 'file_removing',
  FILE_REMOVING_SUCCESS = 'file_removing_success',
  FILE_REMOVING_ERROR = 'file_removing_error',
}

export default STATES;
