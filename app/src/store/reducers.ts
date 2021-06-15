import types from './actionTypes';

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
	searchQuery: string;
	entries: any;
	inviteCode: string;
	address: string;
	errMsg: string;
	directory: string;
}

const initialState: State = {
	token: '',
	sessionCookie: '',
	username: '',
	userData: null,
	fileUploaded: {},
	showPasswordUnlock: false,
	hasUser: false,
	password: null,
	mnemonic: null,
	unlocked: false,
	searchQuery: null,
	entries: null,
	inviteCode: '',
	address: '',
	errMsg: '',
	directory:'root'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_USER.USER_LOGGED_SUCCESS:
			return {
				...state,
				userData: action.payload.res.data,
				unlocked: true,
				password: action.payload.password,
				username: action.payload.username,
			};
		case types.LOGIN_USER.USER_LOGGED_FAILED:
			return { ...state, unlocked: false, errMsg: action?.payload?.res };
		case types.CREATE_USER.CREATE_USER_SUCCESS:
			return {
				...state,
				address: action.payload.data,
				unlocked: true,
				errMsg: '',
			};
		case types.CREATE_USER.CREATE_USER_FAILED:
			return { ...state, unlocked: false, errMsg: action.payload.res };
		case types.SEND_FILE.FILE_SENT_SUCCESS:
			return { ...state, fileUploaded: action.payload };
		case types.SET_SYSTEM:
			return {
				...state,
				password: action.payload.password,
				unlocked: true,
				username: action.payload.username,
			};
		case types.GET_DIRECTORY.GET_DIRECTORY_SUCCESS:
			return { ...state, entries: action.payload.entries, unlocked: true };
		case types.STORE_USER_REGISTRATION_INFO:
			return {
				...state,
				username: action.payload.username,
				password: action.payload.password,
				inviteCode: action.payload.inviteCode,
			};
		case types.SEED_PHRASE.SEED_PHRASE_SUCCESS:
			return {
				...state,
				mnemonic: action.payload,
			};
		case types.SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.payload,
			};
		case types.SET_DIRECTORY:
			return {
				...state,
				directory: action.payload,
			}
		default:
			return state;
	}
};

export { initialState, reducer };
