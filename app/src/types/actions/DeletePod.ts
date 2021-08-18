import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionDeletePodRequest extends BaseAction {
  type: ActionEnum.DELETE_POD_REQUEST;
  payload: string;
}

export interface ActionDeletePodSuccess extends BaseAction {
  type: ActionEnum.POD_DELETE_SUCCESS;
  payload: AxiosResponse<any>;
}

export interface ActionDeletePodFailed extends BaseAction {
  type: ActionEnum.DELETE_POD_FAILED;
  payload: string;
}
