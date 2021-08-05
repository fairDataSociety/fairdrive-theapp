import { State } from "./reducerTypes";
import { Actions } from "./actionTypes";

export interface IContextProps {
  state: State;
  actions: Actions;
}

export interface IStoreProvider {
  children: React.ReactNode | React.ReactNode[];
}
