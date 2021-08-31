import {
  ActionCreateUserRequest,
  ActionCreateUserSuccess,
  ActionCreateUserFailed,
} from '../CreateUser';
import {
  ActionDeleteFileRequest,
  ActionDeleteFileSuccess,
  ActionDeleteFileFailed,
} from '../DeleteFile';
import {
  ActionDeleteFolderRequest,
  ActionDeleteFolderSuccess,
  ActionDeleteFolderFailed,
} from '../DeleteDirectory';
import {
  ActionDeletePodRequest,
  ActionDeletePodSuccess,
  ActionDeletePodFailed,
} from '../DeletePod';
import {
  ActionGetDirectoryRequest,
  ActionGetDirectorySuccess,
} from '../GetDirectory';
import {
  ActionGetPodsRequest,
  ActionGetPodsSuccess,
  ActionGetPodsFailed,
} from '../GetPods';
import {
  ActionLoginUser,
  ActionUserLoggedSuccess,
  ActionUserLoggedFailed,
  ActionLoginUserPending,
} from '../LoginUser';
import {
  ActionUserLogout,
  ActionUserLogoutSuccess,
  ActionUserLogoutFailed,
} from '../LogoutUser';
import {
  ActionOpenPodRequest,
  ActionOpenPodSuccess,
  ActionOpenPodFailed,
} from '../OpenPods';
import {
  ActionSeedPhraseRequest,
  ActionSeedPhraseSuccess,
  ActionSeedPhraseFailed,
} from '../SeedPhrase';
import {
  ActionSendFileRequest,
  ActionSendFilePatchFileUploadRequest,
  ActionSendFileRemoveFileUploadProgress,
  ActionSendFileSuccess,
  ActionSendFileFailed,
} from '../SendFile';
import { ActionSetSystem } from '../SetSystem';
import {
  ActionUserStatsRequest,
  ActionUserStatsSuccess,
  ActionUserStatsFailed,
} from '../UserStats';

// Rest Actions
import { BaseAction } from './BaseAction';
import { ActionEnum } from './ActionsEnum';

interface ActionSetPodName extends BaseAction {
  type: ActionEnum.SET_POD_NAME;
  payload: string;
}

interface ActionSetPrivatePodName extends BaseAction {
  type: ActionEnum.SET_PRIVATE_POD;
  payload: boolean;
}

interface ActionSetSearchQuery extends BaseAction {
  type: ActionEnum.SET_SEARCH_QUERY;
  payload: string | null;
}

interface ActionSetDirectory extends BaseAction {
  type: ActionEnum.SET_DIRECTORY;
  payload: string;
}

interface ActionStoreUserRegistrationInfo extends BaseAction {
  type: ActionEnum.STORE_USER_REGISTRATION_INFO;
  payload: {
    username: string;
    password: string;
    inviteCode: string;
  };
}

export type ActionTree =
  | ActionSetPodName
  | ActionSetSearchQuery
  | ActionSetDirectory
  | ActionSetPrivatePodName
  | ActionStoreUserRegistrationInfo
  | ActionCreateUserRequest
  | ActionCreateUserSuccess
  | ActionCreateUserFailed
  | ActionDeleteFileRequest
  | ActionDeleteFileSuccess
  | ActionDeleteFileFailed
  | ActionDeleteFolderRequest
  | ActionDeleteFolderSuccess
  | ActionDeleteFolderFailed
  | ActionDeletePodRequest
  | ActionDeletePodSuccess
  | ActionDeletePodFailed
  | ActionGetDirectoryRequest
  | ActionGetDirectorySuccess
  | ActionGetPodsRequest
  | ActionGetPodsSuccess
  | ActionGetPodsFailed
  | ActionLoginUser
  | ActionUserLoggedSuccess
  | ActionLoginUserPending
  | ActionUserLoggedFailed
  | ActionUserLogout
  | ActionUserLogoutSuccess
  | ActionUserLogoutFailed
  | ActionOpenPodRequest
  | ActionOpenPodSuccess
  | ActionOpenPodFailed
  | ActionSeedPhraseRequest
  | ActionSeedPhraseSuccess
  | ActionSeedPhraseFailed
  | ActionSendFileRequest
  | ActionSendFilePatchFileUploadRequest
  | ActionSendFileRemoveFileUploadProgress
  | ActionSendFileSuccess
  | ActionSendFileFailed
  | ActionSetSystem
  | ActionUserStatsRequest
  | ActionUserStatsSuccess
  | ActionUserStatsFailed;
