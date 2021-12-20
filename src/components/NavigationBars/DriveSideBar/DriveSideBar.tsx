import { FC, useState, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { DriveToggle } from '@components/Buttons';
import { Button } from '@components/Buttons';
import PodItem from './PodItem/PodItem';

import InfoLightIcon from '@media/UI/info-light.svg';
import InfoDarkIcon from '@media/UI/info-dark.svg';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';

interface DriveSideBarProps {}

const DriveSideBar: FC<DriveSideBarProps> = () => {
  const { theme } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState('private');

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
              <PodItem podName="Private Pod" isActivePod={false} />
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
                <PodItem podName="Shared Pod" isActivePod={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveSideBar;
