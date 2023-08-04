import { FC, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { useFdpStorage } from '@context/FdpStorageContext';
import { createPod } from '@api/pod';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';

interface CreatePodModalProps {
  showModal: boolean;
  closeModal: () => void;
  refreshPods: () => void;
}

const CreatePodModal: FC<CreatePodModalProps> = ({
  showModal,
  closeModal,
  refreshPods,
}) => {
  const { trackEvent } = useMatomo();
  const { fdpClientRef } = useFdpStorage();
  const [loading, setLoading] = useState(false);

  const [newPodName, setNewPodName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateNewPod = async () => {
    setLoading(true);
    try {
      await createPod(fdpClientRef.current, newPodName);
      trackEvent({
        category: 'Create',
        action: `Create Pod`,
        name: `Create Pod: ${newPodName}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });
      refreshPods();
      closeModal();
    } catch (e) {
      setErrorMessage(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Create New Pod"
    >
      <TextInput
        name="pod"
        label="name your pod"
        value={newPodName}
        updateValue={setNewPodName}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        You are about to create a new Pod.
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="Create Pod"
          disabled={loading}
          loading={loading}
          onClick={handleCreateNewPod}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default CreatePodModal;
