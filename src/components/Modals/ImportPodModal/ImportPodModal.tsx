import { FC, useState } from 'react';

import { receivePod } from '@api/pod';
import { useFdpStorage } from '@context/FdpStorageContext';
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
  const { fdpClientRef } = useFdpStorage();
  const [importCode, setImportCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImportPod = async () => {
    try {
      setLoading(true);

      await receivePod(fdpClientRef.current, importCode);

      refreshPods();
      closeModal();
    } catch (error) {
      setErrorMessage('Error: Could not import the Pod.');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          loading={loading}
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
