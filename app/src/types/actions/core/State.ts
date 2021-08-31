import { IFile } from 'src/types/models/File';
import { IDirectory } from 'src/types/models/Directory';
import { CancelTokenSource } from 'axios';

type Status = string | 'loading' | 'success' | 'fail';

interface Flags {
  loginStatus: Status;
}

interface UserStats {
  user_name: string;
  reference: string;
  avatar: string;
}

export interface State {
  token: string;
  sessionCookie: string;
  username: string;
  userData: any;
  fileDeleted: any;
  folderDeleted: any;
  podDeleted: any;
  fileUploaded: any;
  showPasswordUnlock: boolean;
  hasUser: boolean;
  password: string;
  mnemonic: string;
  unlocked: boolean;
  searchQuery: string | null;
  entries: IFile[] | undefined;
  dirs: IDirectory[] | undefined;
  inviteCode: string;
  address: string;
  errMsg: string;
  directory: string;
  pods: string[];
  podMsg: string;
  podName: string;
  podsOpened: string[];
  userStats: UserStats;
  isPrivatePod: boolean;
  flags: Flags;
  fileUploadProgress: Array<{
    progressEvent: ProgressEvent;
    cancelFn: CancelTokenSource;
    requestId: string;
    filename?: string;
  }>;
}
