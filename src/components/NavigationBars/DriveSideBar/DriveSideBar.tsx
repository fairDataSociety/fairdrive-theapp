/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { DriveToggle } from '@components/Buttons';
import { Button } from '@components/Buttons';
import PodItem from './PodItem/PodItem';

import InfoLightIcon from '@media/UI/info-light.svg';
import InfoDarkIcon from '@media/UI/info-dark.svg';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';
import { useEffect } from 'react';
import { getPods, openPod } from '@api/pod';
import PodContext from '@context/PodContext';
import UserContext from '@context/UserContext';

interface DriveSideBarProps {}

const DriveSideBar: FC<DriveSideBarProps> = () => {
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
  const { password } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState('private');
  useEffect(() => {
    if (pods === null || pods === undefined) {
      fetchPods();
    }
  }, [pods]);
  const fetchPods = async () => {
    const response = await getPods();
    setPods(response);
  };

  const setActivePodAndOpenIt = async (podName: string) => {
    if (!openPods.includes(podName)) {
      await openPod(podName, password);
      openPods.push(podName);
      setOpenPods(openPods);
    }
    setActivePod(podName);
    setDirectoryName('root');
  };

  useEffect(() => {
    setActivePod('');
  }, [setActiveTab, activeTab]);

  return (
    <div className="w-56 h-full bg-color-shade-dark-3-day dark:bg-color-shade-dark-4-night overflow-scroll">
      <div className="py-8 px-4">
        <DriveToggle activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex justify-between items-center w-full mt-8 mb-2">
          <span>
            {theme === 'light' ? (
              <InfoLightIcon className="block mr-4" />
            ) : (
              <InfoDarkIcon className="block mr-4" />
            )}
          </span>

          <p className="block text-xs text-color-accents-plum-black dark:text-color-shade-light-2-night">
            Switch from Shared to Owned to see Home Pod
          </p>
        </div>
      </div>

      <div className="text-center">
        {activeTab === 'private' ? (
          <div>
            <Button
              type="button"
              variant="secondary"
              label="Create Pod"
              onClick={() => {
                console.log('Create New Pod');
              }}
              icon={
                theme === 'light' ? (
                  <ArrowRightLight className="inline-block ml-2" />
                ) : (
                  <ArrowRightDark className="inline-block ml-2" />
                )
              }
            />

            <div className="mt-5">
              {pods &&
                pods?.pod_name.map((pod: string) => (
                  <PodItem
                    podName={pod}
                    key={pod}
                    isActivePod={pod === activePod}
                    onClick={() => setActivePodAndOpenIt(pod)}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Button
                type="button"
                variant="secondary"
                label="Import Pod"
                onClick={() => {
                  console.log('Create New Pod');
                }}
                icon={
                  theme === 'light' ? (
                    <ArrowRightLight className="inline-block ml-2" />
                  ) : (
                    <ArrowRightDark className="inline-block ml-2" />
                  )
                }
              />

              <div className="mt-5">
                {pods &&
                  pods?.shared_pod_name.map((pod: string) => {
                    return (
                      <PodItem
                        podName={pod}
                        key={pod}
                        isActivePod={pod === activePod}
                        onClick={() => setActivePodAndOpenIt(pod)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveSideBar;
