import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { UploadFilePayload } from 'src/services/file/upload';
import { FilesUploadedStatus } from './core/State';
export interface ActionSendFileRequest extends BaseAction {
  type: ActionEnum.SEND_FILE_REQUEST;
  payload: UploadFilePayload;
}

export interface ActionSendFilePatchFileUploadRequest extends BaseAction {
  type: ActionEnum.SEND_FILE_PATCH_FILE_UPLOAD_REQUEST;
  payload: {
    progressEvent: ProgressEvent;
    requestId: string;
    cancelFn: CancelTokenSource;
    filename?: string;
  };
}

export interface ActionSendFileRemoveFileUploadProgress extends BaseAction {
  type: ActionEnum.SEND_FILE_REMOVE_FILE_UPLOAD_PROGRESS;
  payload: string;
}

export interface ActionSendFileSuccess extends BaseAction {
  type: ActionEnum.SEND_FILE_FILE_SENT_SUCCESS;
  payload: FilesUploadedStatus;
}

export interface ActionSendFileFailed extends BaseAction {
  type: ActionEnum.SEND_FILE_SENDING_FILE_FAILED;
  payload: FilesUploadedStatus;
}
