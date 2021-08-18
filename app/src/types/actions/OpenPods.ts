import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionOpenPodRequest extends BaseAction {
  type: ActionEnum.OPEN_POD_REQUEST;
  payload: {
    password: string;
    podName: string;
  };
}

export interface ActionOpenPodSuccess extends BaseAction {
  type: ActionEnum.OPEN_POD_SUCCESS;
  payload: AxiosResponse<any>;
}

export interface ActionOpenPodFailed extends BaseAction {
  type: ActionEnum.OPEN_POD_FAIL;
  payload: string;
}
