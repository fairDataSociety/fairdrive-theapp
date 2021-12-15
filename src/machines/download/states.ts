enum STATES {
  STATE_ROOT = 'downloadMachine',
  IDLE = 'idle',

  DOWNLOAD_FILE = 'download_file',
  DOWNLOAD_FILE_LOADING = 'download_file_loading',
  DOWNLOAD_FILE_FAILED = 'download_file_failed',
  DOWNLOAD_FILE_SUCCESS = 'download_file_success',

  DOWNLOAD_FOLDER = 'download_folder',
  DOWNLOAD_FOLDER_LOADING = 'download_folder_loading',
  DOWNLOAD_FOLDER_FAILED = 'download_folder_failed',
  DOWNLOAD_FOLDER_SUCCESS = 'download_folder_success',
}

export default STATES;
