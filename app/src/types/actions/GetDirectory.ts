import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';

export interface ActionGetDirectoryRequest extends BaseAction {
  type: ActionEnum.GET_DIRECTORY_REQUEST;
  payload: {
    directory: string;
    podName: string;
  };
}
export interface ActionGetDirectorySuccess extends BaseAction {
  type: ActionEnum.GET_DIRECTORY_SUCCESS;
  payload: {
    files: IFile[] | undefined;
    dirs: IDirectory[] | undefined;
  };
}
