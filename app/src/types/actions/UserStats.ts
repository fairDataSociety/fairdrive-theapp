import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse } from 'axios';

export interface ActionUserStatsRequest extends BaseAction {
  type: ActionEnum.GET_USER_STATS_REQUEST;
  payload: undefined;
}

export interface ActionUserStatsSuccess extends BaseAction {
  type: ActionEnum.GET_USER_STATS_SUCCESS;
  payload: AxiosResponse<any>;
}

export interface ActionUserStatsFailed extends BaseAction {
  type: ActionEnum.GET_USER_STATS_FAILED;
  payload: string;
}
