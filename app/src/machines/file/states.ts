enum STATES {
  STATE_ROOT = 'fileMachine',
  IDLE = 'idle',
  DOWNLOAD = 'download',
  SHARE = 'share',
  // Upload
  UPLOADING_NODE = 'uploading',
  UPLOADING_LOADING = 'uploading_loading',
  UPLOADING_SUCCESS = 'uploading_success',
  UPLOADING_ERROR = 'uploading_error',
  // Remove
  REMOVING_NODE = 'removing',
  REMOVING_LOADING = 'removing_loading',
  REMOVING_SUCCESS = 'removing_success',
  REMOVING_ERROR = 'removing_error',
}

export default STATES;
