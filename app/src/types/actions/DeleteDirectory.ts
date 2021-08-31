import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';

export interface ActionDeleteFolderRequest extends BaseAction {
  type: ActionEnum.DELETE_FOLDER_REQUEST;
  payload: {
    podName: string;
    path: string;
  };
}

export interface ActionDeleteFolderSuccess extends BaseAction {
  type: ActionEnum.DELETE_FOLDER_FOLDER_DELETE_SUCCESS;
  payload: boolean;
}

export interface ActionDeleteFolderFailed extends BaseAction {
  type: ActionEnum.DELETE_FOLDER_FAILED;
  payload: string;
}
