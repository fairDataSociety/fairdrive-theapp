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
  setOpenPods: (openPods: string[]) => void;
  directoryName: string;
  setDirectoryName: (directoryName: string) => void;
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
  directoryName: '',
  setDirectoryName: (directoryName: string) => {},
};

const PodContext = createContext<PodContext>(podContextDefaultValues);

const PodProvider: FC<PodContextProps> = ({ children }) => {
  const [pods, setPods] = useState(null);
  const [activePod, setActivePod] = useState('');
  const [openPods, setOpenPods] = useState([]);
  const [directoryName, setDirectoryName] = useState('');

  return (
    <PodContext.Provider
      value={{
        pods,
        setPods,
        activePod,
        setActivePod,
        openPods,
        setOpenPods,
        directoryName,
        setDirectoryName,
      }}
    >
      {children}
    </PodContext.Provider>
  );
};

export default PodContext;

export { PodProvider };
