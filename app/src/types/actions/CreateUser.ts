import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

import { CreateAccount } from 'src/types/models/CreateAccount';

export interface ActionCreateUserRequest extends BaseAction {
  type: ActionEnum.CREATE_USER_REQUEST;
  payload: CreateAccount;
}

export interface ActionCreateUserSuccess extends BaseAction {
  type: ActionEnum.CREATE_USER_SUCCESS;
  payload: AxiosResponse<any>;
}

export interface ActionCreateUserFailed extends BaseAction {
  type: ActionEnum.CREATE_USER_FAILED;
  payload: string;
}
