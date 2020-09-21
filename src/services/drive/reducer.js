import * as t from "./actionTypes";

// Service > user

const initialState = {

};

function drive(state = initialState, action) {
    switch (action.type) {
        case t.SET_DRIVE:
            console.log('drive', action)
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export default drive