import { FC } from 'react';
import { Modal } from '@components/Modals';
import { useLocales } from '@context/LocalesContext';

interface BlossomNotFoundModalProps {
  showModal: boolean;
  closeModal: () => void;
}

/**
 * Modal with information in case of Metamask is not installed
 */
const BlossomNotFoundModal: FC<BlossomNotFoundModalProps> = ({
  showModal,
  closeModal,
}) => {
  const { intl } = useLocales();

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('BLOSSOM_NOT_INSTALLED')}
    >
      <div>
        {intl.get('BLOSSOM_NOT_CURRENTLY_INSTALLED')}{' '}
        <a
          className="text-color-accents-purple-heavy dark:text-color-shade-light-1-night"
          href="https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd"
          target="_blank"
          rel="noreferrer"
        >
          {intl.get('CLICK_HERE_TO_INSTALL_IT')}
        </a>
      </div>
    </Modal>
  );
};

export default BlossomNotFoundModal;
