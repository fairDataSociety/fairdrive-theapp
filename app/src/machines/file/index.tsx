import React, { createContext, useContext, useEffect } from 'react';

import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createFileMachine, {
  FileContext,
  FileEvents,
} from 'src/machines/file/machine';

import EVENTS from 'src/machines/file/events';
import { PodProviderContext } from 'src/machines/pod';
import PodEvents from 'src/machines/pod/events';
import STATES from './states';
interface FileProviderContext {
  FileMachineStore: State<FileContext, FileEvents, any>;
  FileMachineActions: {
    onPreviewFile: (fileName: string) => void;
    onDeleteFile: (fileName: string) => void;
    onDownloadFile: (fileName: string) => void;
    onUploadFiles: (uploadingQueue: File[]) => void;
    onCancelUpload: (requestIdToCancel: string) => void;
    onShareFile: (fileName: string) => void;
  };
}

interface FileProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const FileProviderContext = createContext({} as FileProviderContext);

const FileProvider = ({ children }: FileProviderProps): JSX.Element => {
  const { PodMachineStore, PodMachineActions } = useContext(PodProviderContext);

  const [state, send] = useMachine(createFileMachine, { devTools: true });

  const handlePreviewFile = (fileName: string) => {
    send({ type: EVENTS.PREVIEW, fileName });
  };

  const handleDownloadFile = (fileName: string) => {
    send({ type: EVENTS.DOWNLOAD, fileName });
  };

  const handleDeleteFile = (fileName: string) => {
    console.log('handleDeleteFile', fileName);
    send({ type: EVENTS.DELETE, fileName });
  };

  useEffect(() => {
    const match = state.matches({
      [STATES.REMOVING_NODE]: STATES.REMOVING_SUCCESS,
    });
    console.log(match);
    if (match) {
      PodMachineActions.onOpenDirectory(state.context.currentDirectory);
    }
  }, [state, send]);

  const handleUploadFiles = (uploadingQueue: File[]) => {
    send({ type: EVENTS.UPLOAD, uploadingQueue });
  };

  const handleCancelUpload = (requestIdToCancel: string) => {
    send({ type: EVENTS.CANCEL_UPLOAD, requestIdToCancel });
  };

  const handleShareFile = (fileName: string) => {
    send({ type: EVENTS.SHARE, fileName });
  };

  // Update podName and directoryName in FileMachine
  useEffect(() => {
    const filePodNameCopy = state.context.currentPodName;
    const fileDirectoryNameCopy = state.context.currentDirectory;

    const podPodName = PodMachineStore.context.currentlyOpenedPodName;
    const podDirectoryName = PodMachineStore.context.directoryNameToOpen;

    if (filePodNameCopy !== podPodName) {
      send({
        type: EVENTS.UPDATE_CURRENT_PODNAME,
        nextCurrentPodName: podPodName,
      });
    }
    if (fileDirectoryNameCopy !== podDirectoryName) {
      send({
        type: EVENTS.UPDATE_CURRENT_DIRECTORY,
        nextDirectoryName: podDirectoryName,
      });
    }
  }, [PodMachineStore]);

  const value: FileProviderContext = {
    FileMachineStore: state,
    FileMachineActions: {
      onPreviewFile: handlePreviewFile,
      onDeleteFile: handleDeleteFile,
      onDownloadFile: handleDownloadFile,
      onUploadFiles: handleUploadFiles,
      onShareFile: handleShareFile,
      onCancelUpload: handleCancelUpload,
    },
  };

  useEffect(() => {
    console.log('FileMachine state:', state.toStrings());
    console.log('next events', state.nextEvents);
    console.log('context', state.context);
  }, [state, send]);

  return (
    <FileProviderContext.Provider value={value}>
      {children}
    </FileProviderContext.Provider>
  );
};

export default FileProvider;
