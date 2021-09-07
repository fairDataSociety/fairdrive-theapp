import { useContext } from 'react';
import writePath from 'src/helpers/writePath';
import urlPath from 'src/helpers/urlPath';

// Context
import { StoreContext } from 'src/store/store';
import { usePodStateMachine } from 'src/contexts/podStateMachine';
import { STATES_NAMES, DIRECTORY_STATUS } from 'src/types/pod-state';

// Services
import { downloadFile, shareFile } from 'src/services/file';

export function useFileContextActions() {
  const { state, actions } = useContext(StoreContext);
  const { changePodState } = usePodStateMachine();

  const handleDelete = async (fileName: string): Promise<void> => {
    try {
      changePodState({
        tag: STATES_NAMES.DIRECTORY_STATE,
        podName: state.podName,
        directoryName: state.directory,
        status: DIRECTORY_STATUS.FILE_REMOVING,
      });
      await actions.deleteFile({
        file_name: fileName,
        path: writePath(state.directory),
        podName: state.podName,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleDownload = async (fileName: string): Promise<void> => {
    // const newPath = writePath(state.directory);
    try {
      await downloadFile(fileName, urlPath(state.directory), state.podName);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleShare = async (fileName: string): Promise<string> => {
    try {
      const response = await shareFile(
        fileName,
        writePath(state.directory),
        state.podName
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleUpload = async (files: File[]): Promise<void> => {
    try {
      changePodState({
        tag: STATES_NAMES.DIRECTORY_STATE,
        podName: state.podName,
        directoryName: state.directory,
        status: DIRECTORY_STATUS.FILE_UPLOADING,
      });
      const directoryPath = urlPath(state.directory);
      await actions.uploadFile({
        files,
        directory: directoryPath,
        podName: state.podName,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { handleDownload, handleShare, handleDelete, handleUpload };
}
