enum STATES {
  STATE_ROOT = 'podMachine',
  IDLE = 'idle',
  FETCH_PODS = 'fetch_pods',
  FETCH_PODS_FAILED = 'fetch_pods_failed',
  FETCH_PODS_SUCCESS = 'fetch_pods_success',
  FETCH_PODS_LOADING = 'fetch_pods_loading',
  OPEN_POD = 'open_pod',
  OPEN_POD_FAILED = 'open_pod_failed',
  OPEN_POD_SUCCESS = 'open_pod_success',
  OPEN_POD_LOADING = 'open_pod_loading',
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
