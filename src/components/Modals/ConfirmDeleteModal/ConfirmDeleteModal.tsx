import { FC, useEffect, useState } from 'react';

import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

import DeleteLightIcon from '@media/UI/delete-light.svg';
import DeleteDarkIcon from '@media/UI/delete-dark.svg';
import Spinner from '@components/Spinner/Spinner';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [showModal]);

  return (
    <Modal
      showModal={showModal}
      closeModal={() => {
        if (!loading) {
          closeModal();
        }
      }}
      headerIcon={{
        light: <DeleteLightIcon />,
        dark: <DeleteDarkIcon />,
      }}
      headerTitle="Confirm Delete"
    >
      <h5>Are you sure you want to delete the following {type}:</h5>

      <div className="flex justify-between items-center mt-5">
        <p className="text-xs text-center" style={{ overflowWrap: 'anywhere' }}>
          {name}
        </p>
      </div>

      {loading && (
        <div className="mt-3">
          <Spinner />
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        label="Delete"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          deleteHandler();
        }}
        className="mt-8 w-auto text-color-status-negative-night"
      />

      <Button
        type="button"
        variant="secondary"
        label="Cancel"
        onClick={closeModal}
        disabled={loading}
        className="mt-2 w-auto"
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
