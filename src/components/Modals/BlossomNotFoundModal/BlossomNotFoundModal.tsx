import { FC } from 'react';
import { Modal } from '@components/Modals';

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
  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Blossom extension not installed"
    >
      <div>
        Blossom extension is not currently installed.{' '}
        <a
          className="text-color-accents-purple-heavy dark:text-color-shade-light-1-night"
          href="https://chrome.google.com/webstore/detail/blossom/caedjloenbhibmaeffockkiallpngmmd"
          target="_blank"
          rel="noreferrer"
        >
          Click here to install it.
        </a>
      </div>
    </Modal>
  );
};

export default BlossomNotFoundModal;
