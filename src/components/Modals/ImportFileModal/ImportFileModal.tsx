import { FC, useContext, useState } from 'react';

import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { receiveFile } from '@api/files';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { CreatorModalProps } from '@interfaces/handlers';

const ImportFileModal: FC<CreatorModalProps> = ({
  showModal,
  closeModal,
  updateDrive,
}) => {
  const { activePod, directoryName } = useContext(PodContext);
  const { fdpClient } = useFdpStorage();
  const [importCode, setImportCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImportFile = async () => {
    try {
      await receiveFile(fdpClient, importCode, activePod, directoryName);
      updateDrive();
      closeModal();
    } catch {
      setErrorMessage('Error: Could not import the File!');
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Import Shared File"
    >
      <TextInput
        name="code"
        label="link shared with you"
        value={importCode}
        updateValue={setImportCode}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        You are about to import a shared File.
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="Import File"
          onClick={handleImportFile}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default ImportFileModal;
