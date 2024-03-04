import { FC, useContext, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { createDirectory } from '@api/directory';

import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { CreatorModalProps } from '@interfaces/handlers';
import { addItemToCache, ContentType } from '@utils/cache';
import { getFdpPathByDirectory } from '@api/pod';
import { useLocales } from '@context/LocalesContext';
import { getPodName } from '@utils/pod';

const CreateFolderModal: FC<CreatorModalProps> = ({
  showModal,
  closeModal,
  updateDrive,
}) => {
  const [loading, setLoading] = useState(false);

  const { trackEvent } = useMatomo();
  const { activePod, directoryName } = useContext(PodContext);
  const { fdpClientRef, getAccountAddress } = useFdpStorage();
  const [newFolderName, setNewFolderName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { intl } = useLocales();
  const podName = getPodName(activePod);

  const handleCreateNewFolder = async () => {
    setLoading(true);

    try {
      const userAddress = await getAccountAddress();
      const fdpPath = getFdpPathByDirectory(directoryName || 'root');

      const item = await createDirectory(
        fdpClientRef.current,
        podName,
        fdpPath,
        newFolderName
      );

      trackEvent({
        category: 'Create',
        action: `Create Folder`,
        name: `Create Folder: ${newFolderName}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });

      addItemToCache(
        userAddress,
        podName,
        fdpPath,
        item,
        ContentType.DIRECTORY
      );
      updateDrive({
        isUseCacheOnly: true,
      });
      closeModal();
    } catch (e) {
      setErrorMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('CREATE_NEW_FOLDER')}
    >
      <TextInput
        name="folder"
        label={intl.get('NAME_YOUR_FOLDER')}
        value={newFolderName}
        updateValue={setNewFolderName}
      />

      <p className="mb-5 text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        {intl.get('ABOUT_TO_CREATE_FOLDER')}
      </p>

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label={intl.get('CREATE_FOLDER')}
          disabled={loading}
          loading={loading}
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
