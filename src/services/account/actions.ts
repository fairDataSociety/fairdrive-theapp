import * as t from "./actionTypes";

export const createAccount = (data:any) => ({type: t.CREATE_ACCOUNT, data});

export const createMnemonic = (data:any) => ({type: t.CREATE_MNEMONIC, data});

export const createShortCode = (data:any) => ({type: t.CREATE_SHORTCODE, data});

export const resolveShortCode = (data:any) => ({type: t.RESOLVE_SHORTCODE, data});

export const loginAccount = (data:any) => ({type: t.LOGIN_ACCOUNT, data});

export const logoutAccount = (data:any) => ({type: t.LOGOUT_ACCOUNT, data});
