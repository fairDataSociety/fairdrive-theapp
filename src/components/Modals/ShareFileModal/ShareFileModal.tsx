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
import { useLocales } from '@context/LocalesContext';
import Spinner from '@components/Spinner/Spinner';

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
  const { fdpClientRef } = useFdpStorage();
  const [shareCode, setShareCode] = useState('');
  const { intl } = useLocales();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function run() {
      setLoading(true);
      try {
        const response = await shareFile(fdpClientRef.current, {
          fileName: fileName,
          podName: podName,
          path_file: path,
        });
        setShareCode(response);

        trackEvent({
          category: 'File',
          action: `Share File`,
          name: `Share File: ${fileName}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });
      } catch (e) {
        console.log('Could not receive share code!', e);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(shareCode)
      .then(() => {
        console.log('Share code copied!');
      })
      .catch(() => console.log('Could not copy share code!'));
  };

  const headerIcons = {
    light: <FolderLightIcon />,
    dark: <FolderDarkIcon />,
  };

  const closeButton = (
    <Button
      type="button"
      variant="primary"
      label={intl.get('COMPLETE_SHARING')}
      onClick={closeModal}
      className="mt-8 w-auto"
    />
  );

  const ShareBody = ({ loading, shareCode, handleCopyClick }) =>
    loading ? (
      <Spinner />
    ) : (
      <>
        <p className="text-xs text-center">{shortenString(shareCode, 40)}</p>
        <Button
          variant="tertiary"
          onClick={handleCopyClick}
          icon={<CopyIcon className="inline" />}
        />
      </>
    );

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerIcon={headerIcons}
      headerTitle={intl.get('SHARE_FILE')}
    >
      <h5>{intl.get('SHARE_WITH_FRIEND')}</h5>
      <div className="flex justify-between items-center mt-5">
        <ShareBody
          loading={loading}
          shareCode={shareCode}
          handleCopyClick={handleCopyClick}
        />
      </div>
      {closeButton}
    </Modal>
  );
};

export default ShareFileModal;
