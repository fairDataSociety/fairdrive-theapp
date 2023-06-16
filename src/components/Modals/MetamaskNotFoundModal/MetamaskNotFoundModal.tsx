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
      <div>
        Metamask extension is not currently installed.{' '}
        <a
          className="text-color-accents-purple-heavy dark:text-color-shade-light-1-night"
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
        >
          Click here to install it.
        </a>
      </div>

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
