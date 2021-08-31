import { ActionEnum } from './ActionsEnum';

export interface BaseAction {
  type: ActionEnum;
  payload: unknown;
}
