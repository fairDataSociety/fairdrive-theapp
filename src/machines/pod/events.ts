enum EVENTS {
  GET_PODS = 'get_pods',
  RETRY_GET_PODS = 'retry_get_pods',
  OPEN_POD = 'open_pod',

  OPEN_DIRECTORY = 'open_directory',
  DELETE_DIRECTORY = 'delete_directory',
  CREATE_DIRECTORY = 'create_directory',

  SET_SEARCH_QUERY = 'set_search_query',

  CREATE_POD = 'create_pod',
  IMPORT_POD = 'import_pod',

  CLEAR_SEARCH_QUERY = 'clear_search_query',

  UPDATE_USER_PASSWORD = 'update_user_password',

  SHARE_POD = 'share_pod',
  CLOSE_SHARE_POD = 'close_share_pod',

  TOGGLE_DRIVE_MODE = 'toggle_drive_mode',
}

export default EVENTS;
