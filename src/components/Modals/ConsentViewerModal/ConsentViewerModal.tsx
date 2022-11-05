import { FC, useContext, useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import FileSaver from 'file-saver';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useFdpStorage } from '@context/FdpStorageContext';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { downloadFile, deleteFile, FileResponse } from '@api/files';

import { SideModal } from '@components/Modals';
import { ShareFileModal, ConfirmDeleteModal } from '@components/Modals';

import formatDate from 'src/utils/formatDate';
import formatDirectory from '@utils/formatDirectory';

import FolderLightIcon from '@media/UI/folder-light.svg';
import FolderDarkIcon from '@media/UI/folder-dark.svg';

import GlobeLightIcon from '@media/UI/globe-light.svg';
import GlobeDarkIcon from '@media/UI/globe-dark.svg';

import DownloadLightIcon from '@media/UI/download-light.svg';
import DownloadDarkIcon from '@media/UI/download-dark.svg';

import ShareLightIcon from '@media/UI/share-light.svg';
import ShareDarkIcon from '@media/UI/share-dark.svg';

import DeleteLightIcon from '@media/UI/delete-light.svg';
import DeleteDarkIcon from '@media/UI/delete-dark.svg';
import Spinner from '@components/Spinner/Spinner';
import ConsentReceipt from '@components/consentReceipt/consentReceipt';

interface ConsentViewerProps {
  showModal: boolean;
  closeModal: () => void;
  handler: () => void;
  blob?: File;
}

const ConsentViewerModal: FC<ConsentViewerProps> = ({
  showModal,
  closeModal,
  blob,
  handler,
}) => {
  const { fdpClient } = useFdpStorage();
  const { trackEvent } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);
  const [loading, setLoading] = useState(false);

  const [imageSource, setImageSource] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showShareFileModal, setShowShareFileModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    downloadFile(fdpClient, {
      filename: blob?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then(async (response) => {
        const blob = await response.arrayBuffer();
        setImageSource(new Blob([blob]));
      })
      .catch((e) => {
        setErrorMessage('File preview could not be loaded!');
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <>
      <SideModal
        showModal={showModal}
        closeModal={closeModal}
        headerIcon={{
          light: <FolderLightIcon />,
          dark: <FolderDarkIcon />,
        }}
        headerTitle="Preview File"
      >
        {imageSource ? (
          <ConsentReceipt
            data={imageSource}
            alt="Preview Image"
            className="w-full h-auto my-10 rounded"
            onError={() => setErrorMessage('File preview could not be loaded!')}
          />
        ) : null}
        <Spinner isLoading={loading} />

        {errorMessage ? (
          <div className="my-28 text-color-status-negative-day text-xs text-center leading-none">
            {errorMessage}
          </div>
        ) : null}
      </SideModal>
    </>
  );
};

export default ConsentViewerModal;
