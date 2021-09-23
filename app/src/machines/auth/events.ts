enum EVENTS {
  LOGIN = 'login',
  REGISTER_SET_USERNAME_AND_PASSWORDS = 'register_set_username_and_password',
  REGISTER_VALID_USER_PROVIDED_MNEMONIC = 'register_valid_user_provided_mnemonic',

  LOGOUT = 'logout',
  FETCH_USER_STATS = 'fetch_user_stats',
  RETRY_FETCH_USER_STATS = 'retry_fetch_user_stats',
}

export default EVENTS;
