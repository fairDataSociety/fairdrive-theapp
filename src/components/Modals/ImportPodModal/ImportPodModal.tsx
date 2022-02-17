import { FC, useState } from 'react';

import { receivePod } from '@api/pod';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';

interface ImportPodModalProps {
  showModal: boolean;
  closeModal: () => void;
  refreshPods: () => void;
}

const ImportPodModal: FC<ImportPodModalProps> = ({
  showModal,
  closeModal,
  refreshPods,
}) => {
  const [importCode, setImportCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImportPod = () => {
    receivePod(importCode)
      .then(() => {
        refreshPods();
        closeModal();
      })
      .catch(() => {
        setErrorMessage('Error: Could not import the Pod.');
      });
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Import Shared Pod"
    >
      <TextInput
        name="code"
        label="link shared with you"
        value={importCode}
        updateValue={setImportCode}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        You are about to import a shared Pod.
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="Import Pod"
          onClick={handleImportPod}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default ImportPodModal;
