import { FC } from 'react';

import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

import DeleteLightIcon from '@media/UI/delete-light.svg';
import DeleteDarkIcon from '@media/UI/delete-dark.svg';

interface ConfirmDeleteModalProps {
  showModal: boolean;
  closeModal: () => void;
  type: string;
  name: string;
  deleteHandler: () => void;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  showModal,
  closeModal,
  type,
  name,
  deleteHandler,
}) => {
  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerIcon={{
        light: <DeleteLightIcon />,
        dark: <DeleteDarkIcon />,
      }}
      headerTitle="Confirm Delete"
    >
      <h5>Are you sure you want to delete the following {type}:</h5>

      <div className="flex justify-between items-center mt-5">
        <p className="text-xs text-center">{name}</p>
      </div>

      <Button
        type="button"
        variant="primary"
        label="Delete"
        onClick={deleteHandler}
        className="mt-8 w-auto text-color-status-negative-night"
      />

      <Button
        type="button"
        variant="secondary"
        label="Cancel"
        onClick={closeModal}
        className="mt-2 w-auto"
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
