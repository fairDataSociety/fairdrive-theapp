import { FC, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { uploadFile } from '@api/files';

import { SideModal } from '@components/Modals';
import { Button } from '@components/Buttons';

import FolderLightIcon from '@media/UI/folder-light.svg';
import FolderDarkIcon from '@media/UI/folder-dark.svg';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';
import Toast from '@components/Toast/Toast';
import { CreatorModalProps } from '@interfaces/handlers';
import { addItemToCache, ContentType } from '@utils/cache';
import { getFdpPathByDirectory } from '@api/pod';
import { useLocales } from '@context/LocalesContext';

const UploadFileModal: FC<CreatorModalProps> = ({
  showModal,
  closeModal,
  updateDrive,
}) => {
  const { trackEvent } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [fileToUpload, setFileToUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { fdpClientRef, getAccountAddress } = useFdpStorage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      if (activePod) {
        setFileToUpload(acceptedFiles[0]);
      }
    },
  });
  const { intl } = useLocales();

  const handleUpload = async () => {
    if (!(fileToUpload && activePod)) {
      return;
    }

    setLoading(true);
    try {
      const userAddress = await getAccountAddress();
      const directory = directoryName || 'root';
      const fdpPath = getFdpPathByDirectory(directory);
      const item = await uploadFile(fdpClientRef.current, {
        file: fileToUpload,
        directory: directoryName,
        podName: activePod,
      });

      trackEvent({
        category: 'Upload',
        action: `Upload File`,
        name: `Upload File`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });

      addItemToCache(userAddress, activePod, fdpPath, item, ContentType.FILE);
      updateDrive({
        isUseCacheOnly: true,
      });
      closeModal();
      setMessage(intl.get('SUCCESSFULLY_UPLOADED'));
    } catch (e) {
      setErrorMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SideModal
      showModal={showModal}
      closeModal={closeModal}
      headerIcon={{
        light: <FolderLightIcon />,
        dark: <FolderDarkIcon />,
      }}
      headerTitle={intl.get('UPLOAD_FILE')}
    >
      <div
        className="mt-14 p-20 rounded shadow cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} hidden />

        <div className="text-center">
          <span className="py-3 px-4 rounded shadow">
            {theme === 'light' ? (
              <UploadLightIcon className="inline-block" />
            ) : (
              <UploadDarkIcon className="inline-block" />
            )}
          </span>
        </div>

        <p className="mt-14 text-base text-color-accents-purple-heavy text-center">
          {intl.get('DRAG_HERE_TO_UPLOAD')}
        </p>
      </div>

      {fileToUpload ? (
        <p className="mt-5 text-sm text-center text-color-shade-light-2-night">
          {intl.get('READY_TO_UPLOAD')} <strong>{fileToUpload?.name}</strong>
        </p>
      ) : null}

      {errorMessage ? (
        <div className="mt-10 text-color-status-negative-day text-xs text-center leading-none">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-14 text-center">
        <Button
          type="button"
          variant="primary-outlined"
          label={intl.get('UPLOAD_CONTENT')}
          onClick={handleUpload}
          disabled={!fileToUpload || loading}
          loading={loading}
        />
      </div>

      <Toast
        message={message}
        open={Boolean(message)}
        onClose={() => setMessage(null)}
      />
    </SideModal>
  );
};

export default UploadFileModal;
