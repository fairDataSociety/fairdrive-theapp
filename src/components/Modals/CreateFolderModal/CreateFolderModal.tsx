import { FC, useContext, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { createDirectory } from '@api/directory';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import Spinner from '@components/Spinner/Spinner';

interface CreateFolderModalProps {
  showModal: boolean;
  closeModal: () => void;
  refreshDrive: () => void;
}

const CreateFolderModal: FC<CreateFolderModalProps> = ({
  showModal,
  closeModal,
  refreshDrive,
}) => {
  const [loading, setLoading] = useState(false);

  const { trackEvent } = useMatomo();
  const { activePod, directoryName } = useContext(PodContext);
  const { fdpClient } = useFdpStorage();
  const [newFolderName, setNewFolderName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateNewFolder = () => {
    setLoading(true);

    createDirectory(fdpClient, activePod, directoryName, newFolderName)
      .then(() => {
        trackEvent({
          category: 'Create',
          action: `Create Folder`,
          name: `Create Folder: ${newFolderName}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });

        refreshDrive();
        closeModal();
      })
      .catch((e) => {
        setErrorMessage(`${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Create New Folder"
    >
      <Spinner isLoading={loading} />

      <TextInput
        name="folder"
        label="name your folder"
        value={newFolderName}
        updateValue={setNewFolderName}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        You are about to create a new Folder.
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="Create Folder"
          disabled={loading}
          onClick={handleCreateNewFolder}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
