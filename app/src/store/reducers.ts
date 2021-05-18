
import types from "./actionTypes";

export interface State {
  token: string;
  sessionCookie: string;
  username: string;
  userData: any;
  fileUploaded: any;
  showPasswordUnlock: boolean;
  hasUser: boolean;
  password: string;
  mnemonic: string;
  unlocked: boolean;
  searchQuery:string;
  entries: any;
}

const initialState: State = {
  token: "",
  sessionCookie: "",
  username: "",
  userData: {},
  fileUploaded:{},
  showPasswordUnlock: false,
  hasUser: false,
  password: null,
  mnemonic: null,
  unlocked: false,
  searchQuery:null,
  entries: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {  
    case types.LOGIN_USER.USER_LOGGED_SUCCESS:
      return { ...state, userData: action.payload.res.data, unlocked: true, password: action.payload.password,username:action.payload.username };
    case types.SEND_FILE.FILE_SENT_SUCCESS:
      return { ...state, fileUploaded: action.payload };
    case types.SET_SYSTEM:
        return {
          ...state,
          password: action.payload.password,
          unlocked: true,
          username:action.payload.username
        };
    case types.GET_DIRECTORY.GET_DIRECTORY_SUCCESS:
      return { ...state, entries: action.payload.entries, unlocked: true};
    case types.SET_SEARCH_QUERY:
        return {
          ...state,
          searchQuery: action.payload
        };
    default:
      return state;
  }
};

export { initialState, reducer };
