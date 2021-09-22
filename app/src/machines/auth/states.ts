enum STATES {
  STATE_ROOT = 'authMachine',
  IDLE = 'idle',
  LOGIN = 'login',
  LOGIN_LOADING = 'login_loading',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',

  REGISTER_NODE = 'register_node',
  REGISTER_CREATE_MNEMONIC_LOADING = 'register_create_mnemonic_loading',
  REGISTER_CREATE_MNEMONIC_SUCCESS = 'register_create_mnemonic_success',
  REGISTER_CREATE_MNEMONIC_FAILED = 'register_create_mnemonic_failed',
  REGISTER_LOADING = 'register_loading',
  REGISTER_SUCCESS = 'register_success',
  REGISTER_FAILED = 'register_failed',

  FETCH_USER_STATS = 'fetch_userstats',
  FETCH_USER_STATS_LOADING = 'fetch_userstats_loading',
  FETCH_USER_STATS_SUCCESS = 'fetch_userstats_success',
  FETCH_USER_STATS_FAILED = 'fetch_userstats_failed',
}

export default STATES;
