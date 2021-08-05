import { IFile } from "../types/models/File";
import { IDirectory } from "../types/models/Directory";
import { IUserData } from "../types/models/UserData";
import { IUserStats } from "../types/models/UserStats";
import { CancelTokenSource } from "axios";

type Status = string | "loading" | "success" | "fail";

interface Flags {
  loginStatus: Status;
}
export interface State {
  token: string;
  sessionCookie: string;
  username: string;
  userData: IUserData | null;
  fileUploaded: boolean;
  showPasswordUnlock: boolean;
  hasUser: boolean;
  password: string;
  mnemonic: string;
  unlocked: boolean;
  searchQuery: string;
  entries: IFile[] | undefined;
  dirs: IDirectory[] | undefined;
  inviteCode: string;
  address: string;
  errMsg: string;
  directory: string;
  pods: string[];
  podMsg: string | null;
  podName: string;
  podsOpened: string[];
  userStats: IUserStats | null;
  isPrivatePod: boolean;
  flags: Flags;
  fileUploadProgress: {
    progressEvent: ProgressEvent;
    cancelFn: CancelTokenSource;
    requestId: string;
  }[];
}
