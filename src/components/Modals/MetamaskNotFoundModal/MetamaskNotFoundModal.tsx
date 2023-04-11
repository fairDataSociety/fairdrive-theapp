import { FC } from 'react';
import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

interface MetamaskNotFoundModalProps {
  showModal: boolean;
  closeModal: () => void;
}

/**
 * Modal with information in case of Metamask is not installed
 */
const MetamaskNotFoundModal: FC<MetamaskNotFoundModalProps> = ({
  showModal,
  closeModal,
}) => {
  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Metamask not found"
    >
      <h5>
        Install
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
        >
          Metamask
        </a>
        to start using the site
      </h5>

      <Button
        type="button"
        variant="secondary"
        label="Close"
        onClick={closeModal}
        className="mt-8 w-auto"
      />
    </Modal>
  );
};

export default MetamaskNotFoundModal;
