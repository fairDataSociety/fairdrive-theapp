import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';

export interface ActionDeleteFileRequest extends BaseAction {
  type: ActionEnum.DELETE_FILE_REQUEST;
  payload: {
    file_name: string;
    podName: string;
    directoryName: string;
    path: string;
  };
}

export interface ActionDeleteFileSuccess extends BaseAction {
  type: ActionEnum.DELETE_FILE_FILE_DELETE_SUCCESS;
  payload: boolean;
}

export interface ActionDeleteFileFailed extends BaseAction {
  type: ActionEnum.DELETE_FILE_DELETE_FILE_FAILED;
  payload: string;
}
