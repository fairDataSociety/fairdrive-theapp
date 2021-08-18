import { State } from './State';
import { Actions } from './Actions';
import { ActionTree } from './ActionTree';

export type UseActions = (
  state: State,
  dispatch: React.Dispatch<ActionTree>
) => Actions;
