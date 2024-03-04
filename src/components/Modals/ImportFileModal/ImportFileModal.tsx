import { FC, useContext, useState } from 'react';

import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { receiveFile } from '@api/files';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { CreatorModalProps } from '@interfaces/handlers';
import { useLocales } from '@context/LocalesContext';
import { getPodName } from '@utils/pod';

const ImportFileModal: FC<CreatorModalProps> = ({
  showModal,
  closeModal,
  updateDrive,
}) => {
  const { activePod, directoryName } = useContext(PodContext);
  const { fdpClientRef } = useFdpStorage();
  const [importCode, setImportCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { intl } = useLocales();
  const podName = getPodName(activePod);

  const handleImportFile = async () => {
    try {
      setLoading(true);
      await receiveFile(
        fdpClientRef.current,
        importCode,
        podName,
        directoryName
      );
      updateDrive();
      closeModal();
    } catch {
      setErrorMessage(intl.get('IMPORT_FILE_ERROR'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('IMPORT_SHARED_FILE')}
    >
      <TextInput
        name="code"
        label={intl.get('LINK_SHARED_WITH_YOU')}
        value={importCode}
        updateValue={setImportCode}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        {intl.get('ABOUT_TO_IMPORT_SHARED_FILE')}
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label={intl.get('IMPORT_FILE')}
          onClick={handleImportFile}
          disabled={loading}
          loading={loading}
        />
      </div>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default ImportFileModal;
