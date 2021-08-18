import { State } from 'src/types/actions/core/State';
import { Actions } from 'src/types/actions/core/Actions';

export interface IContextProps {
  state: State;
  actions: Actions;
}

export interface IStoreProvider {
  children: React.ReactNode | React.ReactNode[];
}
