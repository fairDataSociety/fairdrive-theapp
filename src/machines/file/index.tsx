import React, { createContext, useContext, useEffect } from 'react';

import { State } from 'xstate';
import { useMachine } from '@xstate/react';
import createFileMachine, {
  FileContext,
  FileEvents,
} from 'src/machines/file/machine';

import EVENTS from 'src/machines/file/events';
import { PodProviderContext } from 'src/machines/pod';
// import PodEvents from 'src/machines/pod/events';
import STATES from './states';
interface FileProviderContext {
  FileMachineStore: State<FileContext, FileEvents, any>;
  FileMachineActions: {
    onPreviewFile: (fileName: string) => void;
    onDeleteFile: (fileName: string) => void;
    onDownloadFile: (fileName: string) => void;
    onUploadFiles: (uploadingQueue: File[]) => void;
    onCancelUpload: (requestIdToCancel: string, fileName: string) => void;
    onShareFile: (fileName: string) => void;
    onImportFile: (
      reference: string,
      podName: string,
      directory: string
    ) => void;
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
    send({ type: EVENTS.DELETE, fileName });
  };

  useEffect(() => {
    const match = state.matches({
      [STATES.REMOVING_NODE]: STATES.REMOVING_SUCCESS,
    });
    if (match) {
      PodMachineActions.onOpenDirectory(state.context.currentDirectory);
    }
  }, [state, send]);

  const handleUploadFiles = (uploadingQueue: File[]) => {
    console.log('handleUploadFiles inited: ', uploadingQueue);
    send({ type: EVENTS.UPLOAD, uploadingQueue });
  };

  const handleCancelUpload = (requestIdToCancel: string, fileName: string) => {
    console.log('handleCancelUpload', requestIdToCancel);
    send({
      type: EVENTS.CANCEL_UPLOAD,
      payload: { fileName, requestIdToCancel },
    });
  };

  useEffect(() => {
    // When uploading finishes then reload directory
    if (
      state.matches({
        [STATES.UPLOADING_NODE]: STATES.UPLOADING_ALL_FILES_FINISHED,
      })
    ) {
      PodMachineActions.onOpenDirectory(state.context.currentDirectory);
    }
  }, [state, send]);

  const handleShareFile = (fileName: string) => {
    send({ type: EVENTS.SHARE, fileName });
  };

  const handleImportFile = (
    sharedFileReference: string,
    podName: string,
    directory: string
  ) => {
    send({
      type: EVENTS.IMPORT,
      payload: {
        sharedFileReference: sharedFileReference,
        currentPodName: podName,
        currentDirectory: directory,
      },
    });
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
      onImportFile: handleImportFile,
      onCancelUpload: handleCancelUpload,
    },
  };

  // useEffect(() => {
  //   console.log('FileMachine state:', state.toStrings());
  //   console.log('next events', state.nextEvents);
  //   console.log('context', state.context);
  // }, [state, send]);

  return (
    <FileProviderContext.Provider value={value}>
      {children}
    </FileProviderContext.Provider>
  );
};

export default FileProvider;
