import types from "./actionTypes";

export const useActions = (state, dispatch) => ({
  userLogin:(data) => {
    dispatch({
      type: types.LOGIN_USER.USER_LOGIN_REQUEST,
      payload: data,
    });
  },
  userLogout:() => {
    dispatch({
      type: types.LOG_OUT_USER.USER_LOG_OUT_REQUEST,
      payload: "",
    });
  },
  sendFile:(data)=>{
    dispatch({
      type: types.SEND_FILE.SEND_FILE_REQUEST,
      payload: data,
    });
  },
  getDirectory:(data)=>{
    dispatch({
      type: types.GET_DIRECTORY.GET_DIRECTORY_REQUEST,
      payload: data,
    });
  },
  storeUserRegistrationInfo: (data) => {
    dispatch({
      type: types.STORE_USER_REGISTRATION_INFO,
      payload: data,
    });
  },
  getSeedPhrase: (data) => {
    dispatch({
      type: types.SEED_PHRASE.SEED_PHRASE_REQUEST,
      payload: data,
    });
  },
  createUser: (data) => {
    dispatch({
      type: types.CREATE_USER.CREATE_USER_REQUEST,
      payload: data,
    });
  },
});

export interface Actions {
  userLogin:(data: any) => void;
  sendFile:(data:any) => void;
  getDirectory:(data:any) => void;
  storeUserRegistrationInfo:(data:any) => void;
  getSeedPhrase:(data:any) => void;
}
