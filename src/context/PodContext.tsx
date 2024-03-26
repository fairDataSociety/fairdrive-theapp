/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { GetPodResponse } from '@api/pod';
import { FC, ReactNode, createContext, useState } from 'react';
import { PodShareInfo } from '@fairdatasociety/fdp-storage/dist/pod/types';
import { SubItem } from '@data/subscription';

interface PodContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  pods: GetPodResponse;
  setPods: (pods: GetPodResponse) => void;
  allSubItems: SubItem[];
  setAllSubItems: (subItems: SubItem[]) => void;
  subscribedPods: PodShareInfo[];
  setSubscribedPods: (subscribedPods: PodShareInfo[]) => void;
  activePod: string | PodShareInfo;
  setActivePod: (pod: string | PodShareInfo) => void;
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
  allSubItems: [],
  setAllSubItems: (subItems: SubItem[]) => {},
  subscribedPods: [],
  setSubscribedPods: (subscribedPods: PodShareInfo[]) => {},
  activePod: null,
  setActivePod: (pod: string | PodShareInfo) => {},
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
  const [allSubItems, setAllSubItems] = useState(null);
  const [subscribedPods, setSubscribedPods] = useState(null);
  const [activePod, setActivePod] = useState<string | PodShareInfo>('');
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
        allSubItems,
        setAllSubItems,
        subscribedPods,
        setSubscribedPods,
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
