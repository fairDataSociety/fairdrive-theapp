import { UploadFilePayload } from 'src/services/file/upload';

export interface Actions {
  userLogin: (data: { username: string; password: string }) => void;
  userLogout: () => void;
  deleteFile: (data: {
    file_name: string;
    podName: string;
    directoryName: string;
    path: string;
  }) => void;
  deleteFolder: (data: { podName: string; path: string }) => void;
  deletePod: (data: string) => void;
  uploadFile: (data: UploadFilePayload) => void;
  cancelUpload: (requestId: string) => void;
  getDirectory: (data: { directory: string; podName: string }) => void;
  storeUserRegistrationInfo: (data: {
    username: string;
    password: string;
    inviteCode: string;
  }) => void;
  getSeedPhrase: () => void;
  createUser: (data: any) => void;
  setSearchQuery: (data: string | null) => void;
  setDirectory: (data: string) => void;
  getPods: () => void;
  getUserStats: () => void;
  openPod: (data: { password: string; podName: string }) => void;
  setPodName: (data: string) => void;
  setPrivatePod: (data: boolean) => void;
}
