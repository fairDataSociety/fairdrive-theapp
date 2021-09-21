enum STATES {
  STATE_ROOT = 'fileMachine',
  IDLE = 'idle',
  DOWNLOAD = 'download',
  SHARE = 'share',
  // Upload
  UPLOADING = 'uploading',
  UPLOADING_SUCCESS = 'uploading_success',
  UPLOADING_ERROR = 'uploading_error',
  // Remove
  REMOVING = 'removing',
  REMOVING_SUCCESS = 'removing_success',
  REMOVING_ERROR = 'removing_error',
}

export default STATES;
