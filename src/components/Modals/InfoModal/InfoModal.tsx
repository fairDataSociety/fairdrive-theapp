import { FC } from 'react';
import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

interface InfoModalProps {
  showModal: boolean;
  closeModal: () => void;
  header: string;
  content: string;
}

/**
 * Modal with information
 */
const InfoModal: FC<InfoModalProps> = ({
  showModal,
  closeModal,
  header,
  content,
}) => {
  return (
    <Modal showModal={showModal} closeModal={closeModal} headerTitle={header}>
      <h5>{content}</h5>

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

export default InfoModal;
