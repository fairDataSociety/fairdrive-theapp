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

export interface DriveActionBarMobileProps {
  refreshDrive?: () => void;
}

const DriveActionBarMobile: FC<DriveActionBarMobileProps> = ({
  refreshDrive,
}) => {
  const { theme } = useContext(ThemeContext);

  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showImportFileModal, setShowImportFileModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  return (
    <>
      <div className="flex md:hidden flex-col justify-center">
        <Button
          type="button"
          variant="primary"
          className="mx-1 mb-3 p-0"
          onClick={() => setShowUploadFileModal(true)}
        >
          <span className="mr-2">
            {theme === 'light' ? (
              <UploadLightIcon className="inline-block" />
            ) : (
              <UploadDarkIcon className="inline-block" />
            )}
          </span>
        </Button>

        <Button
          type="button"
          variant="primary"
          icon={theme === 'light' ? <ImportLightIcon /> : <ImportDarkIcon />}
          className="mx-1 mb-3"
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
    </>
  );
};

export default DriveActionBarMobile;
