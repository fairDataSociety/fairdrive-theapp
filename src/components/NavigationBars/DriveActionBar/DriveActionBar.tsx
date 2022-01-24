import { FC, useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';
import {
  UploadFileModal,
  ImportFileModal,
  CreateFolderModal,
} from '@components/Modals';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

import ImportLightIcon from '@media/UI/import-light.svg';
import ImportDarkIcon from '@media/UI/import-dark.svg';

import CreateFolderLightIcon from '@media/UI/create-folder-light.svg';
import CreateFolderDarkIcon from '@media/UI/create-folder-dark.svg';

export interface DriveActionBarProps {
  refreshDrive: () => void;
}

const DriveActionBar: FC<DriveActionBarProps> = ({ refreshDrive }) => {
  const { theme } = useContext(ThemeContext);

  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  return (
    <div className="w-full mt-4 mb-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-2xl text-color-accents-purple-black dark:text-color-shade-white-night">
          Inventory
        </h2>

        <div className="flex justify-center items-stretch">
          <Button
            type="button"
            variant="primary"
            className="mr-1 p-0"
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
            icon={theme === 'light' ? <ImportLightIcon /> : <ImportDarkIcon />}
            className="mr-1 p-0"
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
            className="mr-1 p-0"
            onClick={() => setShowCreateFolderModal(true)}
          />
        </div>
      </div>

      <div className="text-xs text-color-shade-light-2-night">
        Note: You cannot share content that you do not own
      </div>

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
