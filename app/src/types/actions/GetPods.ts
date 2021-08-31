import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionGetPodsRequest extends BaseAction {
  type: ActionEnum.GET_PODS_REQUEST;
  payload: undefined;
}

export interface ActionGetPodsSuccess extends BaseAction {
  type: ActionEnum.GET_PODS_SUCCESS;
  payload: AxiosResponse<any>;
}

export interface ActionGetPodsFailed extends BaseAction {
  type: ActionEnum.GET_PODS_FAIL;
  payload: string;
}
