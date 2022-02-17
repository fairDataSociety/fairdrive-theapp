import { FC, useEffect, useState } from 'react';

import { exportUser } from '@api/user';

import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

import ExportUserLightIcon from '@media/UI/export-user-light.svg';
import ExportUserDarkIcon from '@media/UI/export-user-dark.svg';
import CopyIcon from '@media/UI/copy.svg';

interface ExportUserModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const ExportUserModal: FC<ExportUserModalProps> = ({
  showModal,
  closeModal,
}) => {
  const [exportCode, setExportCode] = useState('');

  useEffect(() => {
    exportUser()
      .then((response) => {
        setExportCode(response?.address);
      })
      .catch(() => {
        console.log('Could not receive export code!');
      });
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(exportCode)
      .then(() => {
        console.log('Export code copied!');
      })
      .catch(() => console.log('Could not copy export code!'));
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerIcon={{
        light: <ExportUserLightIcon />,
        dark: <ExportUserDarkIcon />,
      }}
      headerTitle="Export User"
    >
      <h5>Use this reference when importing:</h5>

      <div className="flex justify-between items-center mt-5">
        <p className="text-xs text-center">{exportCode}</p>
        <Button
          variant="tertiary"
          onClick={handleCopyClick}
          icon={<CopyIcon className="inline" />}
        />
      </div>

      <Button
        type="button"
        variant="primary"
        label="Complete Export"
        onClick={closeModal}
        className="mt-8 w-auto"
      />
    </Modal>
  );
};

export default ExportUserModal;
