import { FC, useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';
import {
  UploadFileModal,
  ImportFileModal,
  CreateFolderModal,
  ConfirmDeleteModal,
} from '@components/Modals';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

import ImportLightIcon from '@media/UI/import-light.svg';
import ImportDarkIcon from '@media/UI/import-dark.svg';

import CloseLightIcon from '@media/UI/close-light.svg';
import CloseDarkIcon from '@media/UI/close-light.svg';

import CreateFolderLightIcon from '@media/UI/create-folder-light.svg';
import CreateFolderDarkIcon from '@media/UI/create-folder-dark.svg';

export interface DriveActionBarProps {
  refreshDrive: () => void;
  deletePod: () => void;
  activePod: string;
}

const DriveActionBar: FC<DriveActionBarProps> = ({
  refreshDrive,
  deletePod,
  activePod,
}) => {
  const { theme } = useContext(ThemeContext);

  const [showDeletePodModal, setShowDeletePodModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  return (
    <div className="w-full hidden md:block mt-4 mb-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-2xl text-color-accents-purple-black dark:text-color-shade-white-night">
          Inventory
        </h2>

        {activePod && (
          <div className="flex justify-center items-stretch mt-5">
            <Button
              type="button"
              variant="primary"
              disabled={!activePod}
              icon={theme === 'light' ? <CloseLightIcon /> : <CloseDarkIcon />}
              className="mx-1"
              onClick={() => setShowDeletePodModal(true)}
            />
            <Button
              type="button"
              variant="primary"
              className="mx-1 p-0"
              onClick={() => setShowUploadFileModal(true)}
            >
              <span className="mr-2">
                {theme === 'light' ? (
                  <UploadLightIcon className="inline-block" />
                ) : (
                  <UploadDarkIcon className="inline-block" />
                )}
              </span>
              <span className="text-color-accents-purple-heavy text-xs">
                Upload
              </span>
            </Button>

            <Button
              type="button"
              variant="primary"
              icon={
                theme === 'light' ? <ImportLightIcon /> : <ImportDarkIcon />
              }
              className="mx-1"
              onClick={() => setShowImportFileModal(true)}
            />

            <Button
              type="button"
              variant="primary"
              icon={
                theme === 'light' ? (
                  <CreateFolderLightIcon />
                ) : (
                  <CreateFolderDarkIcon />
                )
              }
              className="mx-1"
              onClick={() => setShowCreateFolderModal(true)}
            />
          </div>
        )}
      </div>

      <div className="text-xs text-color-shade-light-2-night">
        Note: You cannot share content that you do not own
      </div>

      {showDeletePodModal && (
        <ConfirmDeleteModal
          showModal={showDeletePodModal}
          closeModal={() => setShowDeletePodModal(false)}
          type="pod"
          name={activePod}
          deleteHandler={() => {
            setShowDeletePodModal(false);
            deletePod();
          }}
        />
      )}

      {showUploadFileModal ? (
        <UploadFileModal
          showModal={showUploadFileModal}
          closeModal={() => setShowUploadFileModal(false)}
          refreshDrive={refreshDrive}
        />
      ) : null}

      {showImportFileModal ? (
        <ImportFileModal
          showModal={showImportFileModal}
          closeModal={() => setShowImportFileModal(false)}
          refreshDrive={refreshDrive}
        />
      ) : null}

      {showCreateFolderModal ? (
        <CreateFolderModal
          showModal={showCreateFolderModal}
          closeModal={() => setShowCreateFolderModal(false)}
          refreshDrive={refreshDrive}
        />
      ) : null}
    </div>
  );
};

export default DriveActionBar;
