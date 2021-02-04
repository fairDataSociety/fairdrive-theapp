import * as t from "./actionTypes";

// Service > user

const initialState = {
    status: 'noAccount',
    locked: true
};

function accountState(state = initialState, action: any) {
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

const account = accountState

export default account
