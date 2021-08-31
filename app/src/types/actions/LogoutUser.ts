import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionUserLogout extends BaseAction {
  type: ActionEnum.USER_LOG_OUT_REQUEST;
  payload: undefined;
}

export interface ActionUserLogoutSuccess extends BaseAction {
  type: ActionEnum.USER_LOGGED_OUT_SUCCESS;
  payload: AxiosResponse<any>;
}
export interface ActionUserLogoutFailed extends BaseAction {
  type: ActionEnum.USER_LOGGED_OUT_FAILED;
  payload: string;
}
