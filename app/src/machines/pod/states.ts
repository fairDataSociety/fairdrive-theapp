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

  CREATE_POD = 'create_pod',
  CREATE_POD_LOADING = 'create_pod_loading',
  CREATE_POD_FAILED = 'create_pod_failed',
  CREATE_POD_SUCCESS = 'create_pod_success',

  IMPORT_POD = 'import_pod',
  IMPORT_POD_LOADING = 'import_pod_loading',
  IMPORT_POD_FAILED = 'import_pod_failed',
  IMPORT_POD_SUCESS = 'import_pod_sucess',

  DIRECTORY = 'directory',
  DIRECTORY_LOADING = 'directory_loading',
  DIRECTORY_SUCCESS = 'directory_success',
  DIRECTORY_FAILED = 'directory_failed',

  CREATE_DIRECTORY_NODE = 'create_directory_node',
  CREATE_DIRECTORY_LOADING = 'create_directory_loading',
  CREATE_DIRECTORY_SUCCESS = 'create_directory_success',
  CREATE_DIRECTORY_FAILED = 'create_directory_failed',

  SEARCH_RESULTS = 'search_results',

  SHARE_POD = 'share_pod',
}

export default STATES;
