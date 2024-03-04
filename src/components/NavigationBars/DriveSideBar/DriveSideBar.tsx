/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useContext, useState, useEffect } from 'react';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { getPods, getSubscriptionPods } from '@api/pod';
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
import { useLocales } from '@context/LocalesContext';
import { PodShareInfo } from '@fairdatasociety/fdp-storage/dist/pod/types';
import { getPodName, isSharedPod } from '@utils/pod';
import UserContext from '@context/UserContext';
import { hashUsername } from '@utils/ens';

const DriveSideBar: FC = () => {
  const { theme } = useContext(ThemeContext);
  const {
    loading: podLoading,
    pods,
    setPods,
    allSubItems,
    setAllSubItems,
    subscribedPods,
    setSubscribedPods,
    activePod,
    setActivePod,
    setDirectoryName,
  } = useContext(PodContext);
  const { fdpClientRef } = useFdpStorage();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const podName = getPodName(activePod);

  const [activeTab, setActiveTab] = useState(
    isSharedPod(activePod) ? 'subscribed' : 'private'
  );
  const [showCreatePodModal, setShowCreatePodModal] = useState(false);
  const [showImportPodModal, setShowImportPodModal] = useState(false);

  const { intl } = useLocales();

  useEffect(() => {
    if (!pods) {
      handleFetchPods();
    }
  }, []);

  const handleFetchPods = async () => {
    setLoading(true);
    try {
      const [pods, subItems] = await Promise.all([
        getPods(fdpClientRef.current),
        user
          ? fdpClientRef.current.dataHub.getAllSubItemsForNameHash(
              hashUsername(user)
            )
          : Promise.resolve([]),
      ]);

      const subscribedPods = await getSubscriptionPods(
        fdpClientRef.current,
        subItems.slice(0, 5)
      );

      setPods(pods);
      setAllSubItems(subItems);
      setSubscribedPods(subscribedPods);
    } catch (error) {
      console.log('Error: Pods could not be fetched (DriveSideBar)!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPod = (pod: string | PodShareInfo) => {
    if (podLoading) {
      return;
    }
    setActivePod(pod);
    setDirectoryName('root');
  };

  return (
    <div className="hidden md:block w-56 h-full bg-color-shade-dark-3-day dark:bg-color-shade-dark-4-night overflow-scroll no-scroll-bar">
      <div className="py-8 px-4">
        <div className="mb-2">
          <Spinner isLoading={loading} />
        </div>
        <DriveToggle
          activeTab={activeTab}
          showSubscribed={Boolean(user)}
          setActiveTab={setActiveTab}
        />
        <div className="flex justify-between items-center w-full mt-8">
          <span className="block -ml-1 mr-3">
            {theme === 'light' ? <InfoLightIcon /> : <InfoDarkIcon />}
          </span>

          <p className="text-xs text-color-accents-plum-black dark:text-color-shade-light-2-night">
            {intl.get('SWITCH_FROM_SHARED_OWNED')}
          </p>
        </div>
      </div>

      <div className="my-2 text-center">
        {activeTab === 'private' ? (
          <Button
            type="button"
            variant="secondary"
            label={intl.get('CREATE_POD')}
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
            label={intl.get('IMPORT_POD')}
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
          {activeTab === 'private' &&
            sortAlphabetically(pods?.pod_name).map((pod: string) => (
              <PodItem
                podName={pod}
                key={pod}
                isActivePod={!isSharedPod(activePod) && pod === podName}
                onClick={() => handleOpenPod(pod)}
              />
            ))}
          {activeTab === 'shared' &&
            sortAlphabetically(pods?.shared_pod_name).map((pod: string) => (
              <PodItem
                podName={pod}
                key={pod}
                isActivePod={pod === podName}
                onClick={() => handleOpenPod(pod)}
              />
            ))}
          {activeTab === 'subscribed' && (
            <>
              {subscribedPods.map((pod) => (
                <PodItem
                  podName={pod.podName}
                  key={pod.podAddress}
                  isActivePod={
                    isSharedPod(activePod) &&
                    pod.podAddress === activePod.podAddress
                  }
                  onClick={() => handleOpenPod(pod)}
                />
              ))}
              {allSubItems.length < subscribedPods.length && (
                <Button
                  type="button"
                  variant="secondary"
                  label={intl.get('LOAD_MORE')}
                  onClick={() => {
                    setShowImportPodModal(true);
                  }}
                />
              )}
            </>
          )}
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
