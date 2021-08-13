import { IFile } from '../types/models/File';
import { IDirectory } from '../types/models/Directory';

type Status = string | 'loading' | 'success' | 'fail';

interface Flags {
  loginStatus: Status;
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
  pods: any;
  podMsg: any;
  podName: string;
  podsOpened: any;
  userStats: any;
  isPrivatePod: boolean;
  flags: Flags;
  fileUploadProgress: Array<{
    progressEvent: ProgressEvent;
    cancelFn;
    requestId: string;
  }>;
}
