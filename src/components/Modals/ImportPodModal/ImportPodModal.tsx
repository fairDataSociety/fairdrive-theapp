import { FC, useState } from 'react';

import { receivePod } from '@api/pod';
import { useFdpStorage } from '@context/FdpStorageContext';
import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { useLocales } from '@context/LocalesContext';

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
  const { intl } = useLocales();

  const handleImportPod = async () => {
    try {
      setLoading(true);

      await receivePod(fdpClientRef.current, importCode);

      refreshPods();
      closeModal();
    } catch (error) {
      setErrorMessage(intl.get('POD_IMPORT_ERROR'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('IMPORT_SHARED_POD')}
    >
      <TextInput
        name="code"
        label={intl.get('LINK_SHARED_WITH_YOU')}
        value={importCode}
        updateValue={setImportCode}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        {intl.get('ABOUT_TO_IMPORT_SHARED_POD')}
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label={intl.get('IMPORT_POD')}
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
