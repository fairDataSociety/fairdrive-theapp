import type {
  DirectoryItem as FdpDirectoryItem,
  FileItem as FdpFileItem,
} from '@fairdatasociety/fdp-storage';

declare module '@fairdatasociety/fdp-storage' {
  interface DirectoryItem extends FdpDirectoryItem {
    path?: string;
  }
  interface FileItem extends FdpFileItem {
    path?: string;
  }
}
