/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { GetPodResponse } from '@api/pod';
import { FC, ReactNode, createContext, useState } from 'react';

interface PodContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  pods: GetPodResponse;
  setPods: (pods: GetPodResponse) => void;
  activePod: string;
  setActivePod: (pod: string) => void;
  openPods: string[];
  setOpenPods: (openPods: string[]) => void;
  directoryName: string;
  setDirectoryName: (directoryName: string) => void;
  clearPodContext: () => void;
}

interface PodContextProps {
  children: ReactNode;
}

const podContextDefaultValues: PodContext = {
  loading: false,
  setLoading: () => {},
  pods: { pod_name: [], shared_pod_name: [] },
  setPods: (pods: GetPodResponse) => {},
  activePod: '',
  setActivePod: (pod: string) => {},
  openPods: [],
  setOpenPods: (openPods: string[]) => {},
  directoryName: '',
  setDirectoryName: (directoryName: string) => {},
  clearPodContext: () => {},
};

const PodContext = createContext<PodContext>(podContextDefaultValues);

const PodProvider: FC<PodContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pods, setPods] = useState(null);
  const [activePod, setActivePod] = useState('');
  const [openPods, setOpenPods] = useState([]);
  const [directoryName, setDirectoryName] = useState('');

  const clearPodContext = () => {
    setLoading(false);
    setPods(null);
    setActivePod('');
    setOpenPods([]);
    setDirectoryName('');
  };

  return (
    <PodContext.Provider
      value={{
        loading,
        setLoading,
        pods,
        setPods,
        activePod,
        setActivePod,
        openPods,
        setOpenPods,
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
