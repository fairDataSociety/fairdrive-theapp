import React, { useReducer, useContext } from "react";
import { useActions } from "./action";
import { applyMiddleware } from "./middleware";
import { initialState, reducer } from "./reducers";

import { IStoreProvider, IContextProps } from "./storeTypes";

export const StoreContext = React.createContext({} as IContextProps);

export function StoreProvider({ children }: IStoreProvider): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, applyMiddleware(dispatch));
  const value = { state, actions };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => {
  return useContext(StoreContext);
};
