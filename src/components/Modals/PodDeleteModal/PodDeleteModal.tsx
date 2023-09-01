import { useContext, useState } from 'react';
import { ConfirmDeleteModal } from '@components/Modals';
import { deletePod } from '@api/pod';
import { useLocales } from '@context/LocalesContext';
import { useFdpStorage } from '@context/FdpStorageContext';
import PodContext from '@context/PodContext';
import { useMatomo } from '@datapunt/matomo-tracker-react';

interface PodDeleteModalProps {
  showModal: boolean;
  refreshPods: () => void;
  onClose: () => void;
  onDelete: () => void;
}

const PodDeleteModal = ({
  showModal,
  refreshPods,
  onClose,
  onDelete,
}: PodDeleteModalProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { trackEvent } = useMatomo();
  const { intl } = useLocales();
  const { fdpClientRef } = useFdpStorage();
  const { activePod, setActivePod } = useContext(PodContext);

  const handleDeletePod = async () => {
    try {
      setErrorMessage('');
      await deletePod(fdpClientRef.current, activePod);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      trackEvent({
        category: 'Pod',
        action: `Delete Pod`,
        name: `Delete Pod: ${activePod}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });
      setActivePod(null);
      refreshPods();
      onDelete();
    } catch (e) {
      setErrorMessage(intl.get('GENERIC_ERROR', { message: String(e) }));
    }
  };

  return (
    <ConfirmDeleteModal
      showModal={showModal}
      closeModal={onClose}
      type="pod"
      name={activePod}
      deleteHandler={handleDeletePod}
      error={errorMessage}
    />
  );
};

export default PodDeleteModal;
