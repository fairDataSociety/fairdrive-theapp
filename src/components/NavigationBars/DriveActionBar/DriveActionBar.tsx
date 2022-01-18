import { FC, useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { receiveFile } from '@api/files';
import { createDirectory } from '@api/directory';

import { Button } from '@components/Buttons';
import { CreateNewModal } from '@components/Modals';
import { UploadFileModal } from '@components/Modals';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

import ImportLightIcon from '@media/UI/import-light.svg';
import ImportDarkIcon from '@media/UI/import-dark.svg';

import CreateFolderLightIcon from '@media/UI/create-folder-light.svg';
import CreateFolderDarkIcon from '@media/UI/create-folder-dark.svg';

export interface DriveActionBarProps {
  createdFile: boolean;
  setCreatedFile: (createdFile: boolean) => void;
  updateDrive: () => void;
}

const DriveActionBar: FC<DriveActionBarProps> = ({
  setCreatedFile,
  updateDrive,
}) => {
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);

  const [sharingFileRef, setSharingFileRef] = useState('');

  const [showUploadFileModal, setShowUploadFileModal] = useState(false);

  const [showFileModal, setShowFileModal] = useState(false);
  const [newDirectoryName, setNewDirectoryName] = useState('');
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);

  const importNewFile = async () => {
    await receiveFile(sharingFileRef, activePod, directoryName);
    setShowFileModal(false);
    setSharingFileRef('');
    setCreatedFile(true);
  };

  const createNewDirectory = async () => {
    await createDirectory(activePod, directoryName, newDirectoryName);
    setShowDirectoryModal(false);
    setNewDirectoryName('');
    setCreatedFile(true);
  };

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
            onClick={() => setShowFileModal(true)}
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
            onClick={() => setShowDirectoryModal(true)}
            className="mr-1 p-0"
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
          updateDrive={updateDrive}
        />
      ) : null}

      {showFileModal && (
        <CreateNewModal
          type="Import Pod"
          showOverlay={showFileModal}
          setShowOverlay={() => {
            setShowFileModal(false);
            setSharingFileRef('');
          }}
          onClick={() => {
            importNewFile();
          }}
          value={sharingFileRef}
          isRefLink={true}
          setNewValue={setSharingFileRef}
        />
      )}

      {showDirectoryModal && (
        <CreateNewModal
          type="Folder"
          showOverlay={showDirectoryModal}
          setShowOverlay={() => {
            setShowDirectoryModal(false);
            setNewDirectoryName('');
          }}
          onClick={() => {
            createNewDirectory();
          }}
          value={newDirectoryName}
          isRefLink={false}
          setNewValue={setNewDirectoryName}
        />
      )}
    </div>
  );
};

export default DriveActionBar;
