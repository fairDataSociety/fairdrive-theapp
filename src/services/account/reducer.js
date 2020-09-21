import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = {
    status: 'noAccount',
    locked: true
};

function accountState(state = initialState, action) {
    switch (action.type) {
        case t.SET_ACCOUNT:
            return {
                ...state,
                ...action.data
            };

        case t.RESET_ACCOUNT:
            return {
                ...initialState
            }

        default:
            return state;
    }
}

const account = persistentReducer(accountState, {
    name: "account"
});

export default account
