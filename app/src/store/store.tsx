import React, { useReducer } from "react";
import { useActions, Actions } from "./action";
import { applyMiddleware } from "./middleware";
import { initialState, State, reducer } from "./reducers";

interface IContextProps {
  state: State;
  actions: Actions;
}

export const StoreContext = React.createContext({} as IContextProps);

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, applyMiddleware(dispatch));
  const value = { state, actions };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
