/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useContext, useState, useEffect } from 'react';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { getPods } from '@api/pod';
import { useFdpStorage } from '@context/FdpStorageContext';

import { DriveToggle } from '@components/Buttons';
import { Button } from '@components/Buttons';
import PodItem from '@components/NavigationBars/DriveSideBar/PodItem/PodItem';
import { CreatePodModal, ImportPodModal } from '@components/Modals';

import InfoLightIcon from '@media/UI/info-light.svg';
import InfoDarkIcon from '@media/UI/info-dark.svg';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';

import sortAlphabetically from 'src/utils/sortAlphabetically';
import Spinner from '@components/Spinner/Spinner';
import UserContext from '@context/UserContext';

const DriveSideBar: FC = () => {
  const { theme } = useContext(ThemeContext);
  const {
    pods,
    setPods,
    activePod,
    setActivePod,
    openPods,
    setOpenPods,
    setDirectoryName,
  } = useContext(PodContext);

  const { beeUrl, setBeeUrl } = useContext(UserContext);
  const { fdpClient, setWallet } = useFdpStorage();
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('private');
  const [showCreatePodModal, setShowCreatePodModal] = useState(false);
  const [showImportPodModal, setShowImportPodModal] = useState(false);

  useEffect(() => {
    if (!pods) {
      handleFetchPods();
    }
  }, []);

  const handleFetchPods = () => {
    setLoading(true);
    getPods(fdpClient)
      .then((response) => {
        setPods(response);
      })
      .catch(() => console.log('Error: Pods could not be fetched!'))
      .finally(() => setLoading(false));
  };

  const handleOpenPod = (podName: string) => {
    setActivePod(podName);
    setDirectoryName('root');
  };

  return (
    <div className="w-56 h-full bg-color-shade-dark-3-day dark:bg-color-shade-dark-4-night overflow-scroll no-scroll-bar">
      <div className="py-8 px-4">
        <Spinner isLoading={loading} />
        <DriveToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex justify-between items-center w-full mt-8">
          <span className="block -ml-1 mr-3">
            {theme === 'light' ? <InfoLightIcon /> : <InfoDarkIcon />}
          </span>

          <p className="text-xs text-color-accents-plum-black dark:text-color-shade-light-2-night">
            Switch from Shared to Owned to see Home Pod
          </p>
        </div>
      </div>

      <div className="my-2 text-center">
        {activeTab === 'private' ? (
          <Button
            type="button"
            variant="secondary"
            label="Create Pod"
            icon={
              theme === 'light' ? (
                <ArrowRightLight className="inline-block ml-2" />
              ) : (
                <ArrowRightDark className="inline-block ml-2" />
              )
            }
            onClick={() => {
              setShowCreatePodModal(true);
            }}
          />
        ) : null}

        {activeTab === 'shared' ? (
          <Button
            type="button"
            variant="secondary"
            label="Import Pod"
            icon={
              theme === 'light' ? (
                <ArrowRightLight className="inline-block ml-2" />
              ) : (
                <ArrowRightDark className="inline-block ml-2" />
              )
            }
            onClick={() => {
              setShowImportPodModal(true);
            }}
          />
        ) : null}
      </div>

      <div className="text-center">
        <div className="mt-5">
          {activeTab === 'private'
            ? sortAlphabetically(pods?.pod_name).map((pod: string) => (
                <PodItem
                  podName={pod}
                  key={pod}
                  isActivePod={pod === activePod}
                  onClick={() => handleOpenPod(pod)}
                />
              ))
            : sortAlphabetically(pods?.shared_pod_name).map((pod: string) => (
                <PodItem
                  podName={pod}
                  key={pod}
                  isActivePod={pod === activePod}
                  onClick={() => handleOpenPod(pod)}
                />
              ))}
        </div>
      </div>

      {showCreatePodModal ? (
        <CreatePodModal
          showModal={showCreatePodModal}
          closeModal={() => setShowCreatePodModal(false)}
          refreshPods={handleFetchPods}
        />
      ) : null}

      {showImportPodModal ? (
        <ImportPodModal
          showModal={showImportPodModal}
          closeModal={() => setShowImportPodModal(false)}
          refreshPods={handleFetchPods}
        />
      ) : null}
    </div>
  );
};

export default DriveSideBar;
