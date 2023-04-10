/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { GetPodResponse } from '@api/pod';
import { FC, ReactNode, createContext, useState } from 'react';

interface PodContext {
  pods: GetPodResponse;
  setPods: (pods: GetPodResponse) => void;
  activePod: string;
  setActivePod: (pod: string) => void;
  openPods: string[];
  deletePod: (podName: string) => void;
  setOpenPods: (openPods: string[]) => void;
  directoryName: string;
  setDirectoryName: (directoryName: string) => void;
  clearPodContext: () => void;
}

interface PodContextProps {
  children: ReactNode;
}

const podContextDefaultValues: PodContext = {
  pods: { pod_name: [], shared_pod_name: [] },
  setPods: (pods: GetPodResponse) => {},
  activePod: '',
  setActivePod: (pod: string) => {},
  openPods: [],
  setOpenPods: (openPods: string[]) => {},
  deletePod: (podName: string) => {},
  directoryName: '',
  setDirectoryName: (directoryName: string) => {},
  clearPodContext: () => {},
};

const PodContext = createContext<PodContext>(podContextDefaultValues);

const PodProvider: FC<PodContextProps> = ({ children }) => {
  const [pods, setPods] = useState(null);
  const [activePod, setActivePod] = useState('');
  const [openPods, setOpenPods] = useState([]);
  const [directoryName, setDirectoryName] = useState('');

  const clearPodContext = () => {
    setPods(null);
    setActivePod('');
    setOpenPods([]);
    setDirectoryName('');
  };

  const deletePodFromArray = (podName: string, pods: string[]) => {
    const index = pods.findIndex((pod) => pod === podName);

    if (index >= 0) {
      pods.splice(index, 1);
    }
  };

  const deletePod = (podName: string) => {
    if (!pods) {
      return;
    }

    const { pod_name, shared_pod_name } = pods;

    const podsCopy = {
      pod_name: [...pod_name],
      shared_pod_name: [...shared_pod_name],
    };

    deletePodFromArray(podName, podsCopy.pod_name);
    deletePodFromArray(podName, podsCopy.shared_pod_name);

    setPods(podsCopy);
  };

  return (
    <PodContext.Provider
      value={{
        pods,
        setPods,
        activePod,
        setActivePod,
        openPods,
        setOpenPods,
        deletePod,
        directoryName,
        setDirectoryName,
        clearPodContext,
      }}
    >
      {children}
    </PodContext.Provider>
  );
};

export default PodContext;

export { PodProvider };
