import React, { createContext, useContext } from 'react';
import { State } from 'xstate';
import { useMachine } from '@xstate/react';

import { PodProviderContext } from 'src/machines/pod';
import { getDirectory } from 'src/services/directory';

import createDownloadMachine, {
  DownloadContext,
  DownloadEvents,
} from 'src/machines/download/machine';

import EVENTS from 'src/machines/download/events';

interface DownloadProviderContext {
  DownloadMachineStore: State<DownloadContext, DownloadEvents, any>;
  DownloadMachineActions: {
    onDownloadFile: (fileName: string) => void;
    onDownloadFolder: (folderName: string) => void;
  };
}

interface DownloadProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const DownloadProviderContext = createContext(
  {} as DownloadProviderContext
);

const FileProvider = ({ children }: DownloadProviderProps): JSX.Element => {
  const { PodMachineStore } = useContext(PodProviderContext);

  const [state, send] = useMachine(createDownloadMachine, { devTools: true });

  const handleDownloadFile = (fileName: string) => {
    send({
      type: EVENTS.DOWNLOAD_FILE,
      payload: {
        pod: PodMachineStore.context.currentlyOpenedPodName,
        directory: PodMachineStore.context.directoryNameToOpen,
        file: fileName,
      },
    });
  };

  const handleDownloadFolder = (folderName: string) => {
    getDirectory({
      directory: folderName,
      podName: PodMachineStore.context.currentlyOpenedPodName,
    }).then((data) => {
      send({
        type: EVENTS.DOWNLOAD_FOLDER,
        payload: {
          pod: PodMachineStore.context.currentlyOpenedPodName,
          directory: folderName,
          files: data.files,
        },
      });
    });
  };

  const value = {
    DownloadMachineStore: state,
    DownloadMachineActions: {
      onDownloadFile: handleDownloadFile,
      onDownloadFolder: handleDownloadFolder,
    },
  };

  return (
    <DownloadProviderContext.Provider value={value}>
      {children}
    </DownloadProviderContext.Provider>
  );
};

export default FileProvider;
