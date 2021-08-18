import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';

export interface ActionSetSystem extends BaseAction {
  type: ActionEnum.SET_SYSTEM;
  payload: {
    password: string;
    username: string;
  };
}
