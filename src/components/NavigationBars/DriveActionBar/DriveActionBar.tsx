import { useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';
import { ImportFileModal, CreateFolderModal } from '@components/Modals';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

import ImportLightIcon from '@media/UI/import-light.svg';
import ImportDarkIcon from '@media/UI/import-dark.svg';

import CreateFolderLightIcon from '@media/UI/create-folder-light.svg';
import CreateFolderDarkIcon from '@media/UI/create-folder-dark.svg';
import PodContext from '@context/PodContext';
import { UpdateDriveProps } from '@interfaces/handlers';
import { useLocales } from '@context/LocalesContext';
import { getPodName, isSharedPod } from '@utils/pod';

export interface DriveActionBarProps extends UpdateDriveProps {
  onFileUploadClick: () => void;
}

const DriveActionBar = ({
  updateDrive,
  onFileUploadClick,
}: DriveActionBarProps) => {
  const { theme } = useContext(ThemeContext);
  const { activePod } = useContext(PodContext);

  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const { intl } = useLocales();
  const podName = getPodName(activePod);

  return (
    <div className="w-full hidden md:block mt-4 mb-6">
      <div className="flex justify-between items-center w-full">
        {podName && !isSharedPod(activePod) && (
          <div className="flex justify-center items-stretch mt-5">
            <Button
              type="button"
              variant="primary"
              className="mx-1 p-0"
              disabled={!podName}
              onClick={onFileUploadClick}
            >
              <span className="mr-2">
                {theme === 'light' ? (
                  <UploadLightIcon className="inline-block" />
                ) : (
                  <UploadDarkIcon className="inline-block" />
                )}
              </span>
              <span className="text-color-accents-purple-heavy text-xs">
                {intl.get('UPLOAD')}
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

      <div className="text-xs text-color-shade-light-2-night mt-3">
        {intl.get('COPYRIGHT_WARNING')}
      </div>

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
    </div>
  );
};

export default DriveActionBar;
