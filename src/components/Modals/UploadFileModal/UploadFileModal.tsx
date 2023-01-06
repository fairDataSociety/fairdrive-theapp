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
import Spinner from '@components/Spinner/Spinner';
import Toast from '@components/Toast/Toast';

interface UploadFileModalProps {
  showModal: boolean;
  closeModal: () => void;
  refreshDrive: () => void;
}

const UploadFileModal: FC<UploadFileModalProps> = ({
  showModal,
  closeModal,
  refreshDrive,
}) => {
  const { trackEvent } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName, pods } = useContext(PodContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [fileToUpload, setFileToUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { fdpClient } = useFdpStorage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      if (activePod) {
        setFileToUpload(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = () => {
    if (fileToUpload && activePod) {
      setLoading(true);
      uploadFile(fdpClient, {
        file: fileToUpload,
        directory: directoryName,
        podName: activePod,
      })
        .then(() => {
          trackEvent({
            category: 'Upload',
            action: `Upload File`,
            name: `Upload File`,
            documentTitle: 'Drive Page',
            href: window.location.href,
          });

          refreshDrive();
          closeModal();
          setMessage('Successfully uploaded');
        })
        .catch((e) => {
          setErrorMessage(`${e.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
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
      headerTitle="Upload File"
    >
      <Spinner isLoading={loading} />

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
          Click or drag here to upload
        </p>
      </div>

      {fileToUpload ? (
        <p className="mt-5 text-sm text-center text-color-shade-light-2-night">
          Ready to upload: <strong>{fileToUpload?.name}</strong>
        </p>
      ) : null}

      <div className="mt-14 text-center">
        <Button
          type="button"
          variant="primary-outlined"
          label="Upload content"
          onClick={handleUpload}
          disabled={!fileToUpload}
        />
      </div>

      <Toast
        message={message}
        open={Boolean(message)}
        onClose={() => setMessage(null)}
      />

      {errorMessage ? (
        <div className="my-28 text-color-status-negative-day text-xs text-center leading-none">
          {errorMessage}
        </div>
      ) : null}
    </SideModal>
  );
};

export default UploadFileModal;
