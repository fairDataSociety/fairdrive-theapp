import { FC, useEffect, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { shareFile } from '@api/files';
import { useFdpStorage } from '@context/FdpStorageContext';

import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';

import shortenString from '@utils/shortenString';

import FolderLightIcon from '@media/UI/folder-light.svg';
import FolderDarkIcon from '@media/UI/folder-dark.svg';
import CopyIcon from '@media/UI/copy.svg';

interface ShareFileModalProps {
  showModal: boolean;
  closeModal: () => void;
  fileName: string;
  podName: string;
  path: string;
}

const ShareFileModal: FC<ShareFileModalProps> = ({
  showModal,
  closeModal,
  fileName,
  podName,
  path,
}) => {
  const { trackEvent } = useMatomo();
  const { fdpClient } = useFdpStorage();
  const [shareCode, setShareCode] = useState('');

  useEffect(() => {
    shareFile(fdpClient, {
      fileName: fileName,
      podName: podName,
      path_file: path,
    })
      .then((response) => {
        setShareCode(response);

        trackEvent({
          category: 'File',
          action: `Share File`,
          name: `Share File: ${fileName}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });
      })
      .catch(() => {
        console.log('Could not receive share code!');
      });
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(shareCode)
      .then(() => {
        console.log('Share code copied!');
      })
      .catch(() => console.log('Could not copy share code!'));
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerIcon={{
        light: <FolderLightIcon />,
        dark: <FolderDarkIcon />,
      }}
      headerTitle="Share File"
    >
      <h5>Share this code with a friend:</h5>

      <div className="flex justify-between items-center mt-5">
        <p className="text-xs text-center">{shortenString(shareCode, 40)}</p>
        <Button
          variant="tertiary"
          onClick={handleCopyClick}
          icon={<CopyIcon className="inline" />}
        />
      </div>

      <Button
        type="button"
        variant="primary"
        label="Complete Sharing"
        onClick={closeModal}
        className="mt-8 w-auto"
      />
    </Modal>
  );
};

export default ShareFileModal;
