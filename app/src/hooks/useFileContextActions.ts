import React, { useContext } from 'react';
import writePath from 'src/helpers/writePath';
import urlPath from 'src/helpers/urlPath';

// Context
import { StoreContext } from 'src/store/store';

// Services
import { downloadFile, shareFile } from 'src/services/file';

export function useFileContextActions() {
  const { state, actions } = useContext(StoreContext);

  const handleDelete = async (fileName: string): Promise<void> => {
    try {
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

  return { handleDownload, handleShare, handleDelete };
}
