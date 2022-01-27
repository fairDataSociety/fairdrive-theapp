import { FC, useContext, useState } from 'react';

import UserContext from '@context/UserContext';

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
  const { password } = useContext(UserContext);

  const [newPodName, setNewPodName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateNewPod = () => {
    createPod(newPodName, password)
      .then(() => {
        refreshPods();
        closeModal();
      })
      .catch(() => {
        setErrorMessage('Error: Could not create a new Pod.');
      });
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
