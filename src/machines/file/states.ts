enum STATES {
  STATE_ROOT = 'fileMachine',
  IDLE = 'idle',
  // Preview
  PREVIEW_NODE = 'preview_node',
  PREVIEW_LOADING = 'preview_loading',
  PREVIEW_ERROR = 'preview_error',
  PREVIEW_SUCCESS = 'preview_success',

  // Download
  DOWNLOAD_NODE = 'download_node',
  DOWNLOAD_LOADING = 'download_loading',
  DOWNLOAD_ERROR = 'download_error',
  DOWNLOAD_SUCCESS = 'download_success',

  // Share
  SHARING_NODE = 'sharing_node',
  SHARING_LOADING = 'sharing_loading',
  SHARING_SUCCESS = 'sharing_success',
  SHARING_ERROR = 'sharing_error',

  // Upload
  UPLOADING_NODE = 'uploading',
  UPLOADING_LOADING = 'uploading_loading',
  UPLOADING_SUCCESS = 'uploading_success',
  UPLOADING_ERROR = 'uploading_error',
  UPLOADING_ALL_FILES_FINISHED = 'uploading_all_files_finished',

  // Remove
  REMOVING_NODE = 'removing',
  REMOVING_LOADING = 'removing_loading',
  REMOVING_SUCCESS = 'removing_success',
  REMOVING_ERROR = 'removing_error',

  // Import
  IMPORT_FILE = "importing",
  IMPORT_LOADING = "import_loading",
  IMPORT_SUCCESS = "import_success",
  IMPORT_FAILED = "import_failed",
}

export default STATES;
