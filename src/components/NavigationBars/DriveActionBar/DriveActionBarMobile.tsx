import { FC, useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';

import {
  UploadFileModal,
  ImportFileModal,
  CreateFolderModal,
  CreatePodModal,
} from '@components/Modals';

import DriveActiveLightIcon from '@media/UI/drive-active-light.svg';
import DriveActiveDarkIcon from '@media/UI/drive-active-dark.svg';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

import ImportLightIcon from '@media/UI/import-light.svg';
import ImportDarkIcon from '@media/UI/import-dark.svg';

import CreateFolderLightIcon from '@media/UI/create-folder-light.svg';
import CreateFolderDarkIcon from '@media/UI/create-folder-dark.svg';
import { UpdateDriveProps } from '@interfaces/handlers';
import { useLocales } from '@context/LocalesContext';
import PodContext from '@context/PodContext';
import { getPodName, isSharedPod } from '@utils/pod';

import classes from './DriveActionBarMobile.module.scss';

export interface DriveActionBarMobileProps extends UpdateDriveProps {
  refreshPods?: () => void;
}

const DriveActionBarItem = (
  theme: string,
  label: string,
  imageLight: JSX.Element,
  imageDark: JSX.Element,
  onClick: () => void,
  disabled = false
) => {
  return (
    <div
      className={`py-2 w-24 block md:hidden sm:w-full py-1 flex-shrink-0 md:py-4 shadow cursor-pointer hover:bg-color-shade-dark-4-day dark:hover:bg-color-shade-dark-2-night ${classes.DriveActionBarItem}`}
      onClick={disabled ? undefined : onClick}
    >
      <a className="flex flex-col justify-center items-center">
        {theme === 'light' ? imageLight : imageDark}

        <span className="inline-block text-center mt-2 text-color-accents-plum-black dark:text-color-shade-light-2-night">
          {label}
        </span>
      </a>
    </div>
  );
};

const DriveActionBarMobile: FC<DriveActionBarMobileProps> = ({
  updateDrive,
  refreshPods,
}) => {
  const { theme } = useContext(ThemeContext);
  const { activePod } = useContext(PodContext);

  const [showCreatePodModal, setShowCreatePodModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const { intl } = useLocales();
  const podName = getPodName(activePod);
  const canEdit = !isSharedPod(activePod);

  return (
    <>
      {DriveActionBarItem(
        theme,
        intl.get('NEW_POD'),
        <DriveActiveLightIcon height="22" />,
        <DriveActiveDarkIcon height="22" />,
        () => setShowCreatePodModal(true)
      )}
      {canEdit &&
        DriveActionBarItem(
          theme,
          intl.get('UPLOAD'),
          <UploadLightIcon height="22" />,
          <UploadDarkIcon height="22" />,
          () => setShowUploadFileModal(true),
          !podName
        )}
      {canEdit &&
        DriveActionBarItem(
          theme,
          intl.get('IMPORT'),
          <ImportLightIcon height="22" />,
          <ImportDarkIcon height="22" />,
          () => setShowImportFileModal(true)
        )}
      {canEdit &&
        DriveActionBarItem(
          theme,
          intl.get('NEW_FOLDER'),
          <CreateFolderLightIcon height="22" />,
          <CreateFolderDarkIcon height="22" />,
          () => setShowCreateFolderModal(true),
          !podName
        )}
      {showCreatePodModal ? (
        <CreatePodModal
          showModal={showCreatePodModal}
          closeModal={() => setShowCreatePodModal(false)}
          refreshPods={refreshPods}
        />
      ) : null}
      {showUploadFileModal ? (
        <UploadFileModal
          showModal={showUploadFileModal}
          closeModal={() => setShowUploadFileModal(false)}
          updateDrive={updateDrive}
        />
      ) : null}

      {showImportFileModal ? (
        <ImportFileModal
          showModal={showImportFileModal}
          closeModal={() => setShowImportFileModal(false)}
          updateDrive={updateDrive}
        />
      ) : null}

      {showCreateFolderModal ? (
        <CreateFolderModal
          showModal={showCreateFolderModal}
          closeModal={() => setShowCreateFolderModal(false)}
          updateDrive={updateDrive}
        />
      ) : null}
    </>
  );
};

export default DriveActionBarMobile;
