import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionLoginUser extends BaseAction {
  type: ActionEnum.USER_LOGIN_REQUEST;
  payload: { username: string; password: string };
}

export interface ActionLoginUserPending extends BaseAction {
  type: ActionEnum.USER_LOGIN_PENDING;
  payload: undefined;
}

export interface ActionUserLoggedSuccess extends BaseAction {
  type: ActionEnum.USER_LOGGED_SUCCESS;
  payload: {
    password: string;
    username: string;
    res: AxiosResponse<any>;
  };
}
export interface ActionUserLoggedFailed extends BaseAction {
  type: ActionEnum.USER_LOGGED_FAILED;
  payload: string;
}
