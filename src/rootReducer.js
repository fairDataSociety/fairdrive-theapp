import { combineReducers } from "redux";
import services from "./services";

const initialState = {};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const servicesReducers = {};
Object.values(services).forEach(({ mountPoint, reducer }) => {
  servicesReducers[mountPoint] = reducer;
});

export default combineReducers({
  ...servicesReducers,
  globalReducer
});
