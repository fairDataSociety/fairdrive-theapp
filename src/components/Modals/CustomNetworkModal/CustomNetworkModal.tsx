import { FC, useContext, useState } from 'react';

import PodContext from '@context/PodContext';
import FdpStorageContext, { useFdpStorage } from '@context/FdpStorageContext';

import { createDirectory } from '@api/directory';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import Spinner from '@components/Spinner/Spinner';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import UserContext from '@context/UserContext';

interface CustomNetworkModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const CustomNetworkModal: FC<CustomNetworkModalProps> = ({
  showModal,
  closeModal,
}) => {
  const { beeUrl, setBeeUrl } = useContext(UserContext);
  const { setFdpClientBeeRpc } = useFdpStorage();
  const [loading, setLoading] = useState(false);

  const [newCustomNetwork, setUrl] = useState(beeUrl);
  const [errorMessage] = useState('');
  const handleCustomNetwork = () => {
    setLoading(true);
    setFdpClientBeeRpc(newCustomNetwork);
    setBeeUrl(newCustomNetwork);
    setLoading(false);
    closeModal();
  };
  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Add Custom Bee Network"
    >
      <Spinner isLoading={loading} />

      <TextInput
        name="folder"
        label="url"
        value={newCustomNetwork}
        updateValue={setUrl}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        You are about to add a new custom bee network.
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="Custom Network"
          onClick={handleCustomNetwork}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default CustomNetworkModal;
