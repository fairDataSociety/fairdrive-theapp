import { useContext, useState } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';

import MenuLight from '@media/UI/menu-light.svg';
import MenuDark from '@media/UI/menu-dark.svg';

import SortLight from '@media/UI/sort-light.svg';
import SortDark from '@media/UI/sort-dark.svg';
import Download from '@media/UI/download.svg';
import { CreateNewModal } from '@components/Modals';
import { receiveFile } from '@api/files';
import PodContext from '@context/PodContext';
import { createDirectory } from '@api/directory';

export interface DriveActionButtonBarProps {
  createdFile: boolean;
  setCreatedFile: (createdFile: boolean) => void;
}
const DriveActionButtonBar = ({
  setCreatedFile,
}: DriveActionButtonBarProps) => {
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);
  //TODO CHANGE ICONS
  // TODO Refresh files and directories after import and creation. Do it on Drive level. Send Flag to refresh.
  const [sharingFileRef, setSharingFileRef] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const importNewFile = async () => {
    // TODO Add two modals, one when success, second when failed. Check design
    await receiveFile(sharingFileRef, activePod, directoryName);
    setShowFileModal(false);
    setSharingFileRef('');
    setCreatedFile(true);
  };

  const [newDirectoryName, setNewDirectoryName] = useState('');
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const createNewDirectory = async () => {
    await createDirectory(activePod, directoryName, newDirectoryName);
    setShowDirectoryModal(false);
    setNewDirectoryName('');
    setCreatedFile(true);
  };

  return (
    <div className="w-full pt-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-lg text-color-accents-purple-black dark:text-color-shade-white-night">
          Inventory
        </h2>
        <div>
          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <MenuLight /> : <MenuDark />}
            className="mr-1 p-0"
            onClick={() => setShowFileModal(true)}
          />

          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <SortLight /> : <SortDark />}
            onClick={() => setShowDirectoryModal(true)}
            className="ml-1 p-0"
          />
          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <Download /> : <Download />}
            className="ml-1 p-0"
          />
        </div>
      </div>
      <div className="text-color-accents-purple-black dark:text-color-shade-white-night">
        Note: You cannot share content that you do not own
      </div>
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
        ></CreateNewModal>
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
        ></CreateNewModal>
      )}
    </div>
  );
};

export default DriveActionButtonBar;
