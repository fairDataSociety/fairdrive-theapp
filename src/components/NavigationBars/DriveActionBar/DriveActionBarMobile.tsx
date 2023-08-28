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

import DeleteLightIcon from '@media/UI/delete-light.svg';
import DeleteDarkIcon from '@media/UI/delete-dark.svg';

import { UpdateDriveProps } from '@interfaces/handlers';
import { useLocales } from '@context/LocalesContext';
import PodDeleteModal from '@components/Modals/PodDeleteModal/PodDeleteModal';

export interface DriveActionBarMobileProps extends UpdateDriveProps {
  refreshPods?: () => void;
}

const DriveActionBarItem = (
  theme: string,
  label: string,
  imageLight: JSX.Element,
  imageDark: JSX.Element,
  onClick: () => void
) => {
  return (
    <div
      className="py-2 md:py-4 shadow cursor-pointer hover:bg-color-shade-dark-4-day dark:hover:bg-color-shade-dark-2-night"
      onClick={onClick}
    >
      <a className="flex flex-col justify-center items-center">
        {theme === 'light' ? imageLight : imageDark}

        <span className="inline-block mt-2 text-color-accents-plum-black dark:text-color-shade-light-2-night">
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

  const [showCreatePodModal, setShowCreatePodModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showDeletePodModal, setShowDeletePodModal] = useState(false);

  const { intl } = useLocales();

  return (
    <>
      <div className="flex md:hidden flex-col justify-center w-full">
        {DriveActionBarItem(
          theme,
          intl.get('NEW_POD'),
          <DriveActiveLightIcon />,
          <DriveActiveDarkIcon />,
          () => setShowCreatePodModal(true)
        )}
        {DriveActionBarItem(
          theme,
          intl.get('UPLOAD'),
          <UploadLightIcon />,
          <UploadDarkIcon />,
          () => setShowUploadFileModal(true)
        )}
        {DriveActionBarItem(
          theme,
          intl.get('IMPORT'),
          <ImportLightIcon />,
          <ImportDarkIcon />,
          () => setShowImportFileModal(true)
        )}
        {DriveActionBarItem(
          theme,
          intl.get('FOLDER'),
          <CreateFolderLightIcon />,
          <CreateFolderDarkIcon />,
          () => setShowCreateFolderModal(true)
        )}
        {DriveActionBarItem(
          theme,
          intl.get('DELETE'),
          <DeleteLightIcon />,
          <DeleteDarkIcon />,
          () => setShowDeletePodModal(true)
        )}
      </div>
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

      {showDeletePodModal && (
        <PodDeleteModal
          showModal={showDeletePodModal}
          onClose={() => setShowDeletePodModal(false)}
          onDelete={() => setShowDeletePodModal(false)}
          refreshPods={refreshPods}
        />
      )}
    </>
  );
};

export default DriveActionBarMobile;
