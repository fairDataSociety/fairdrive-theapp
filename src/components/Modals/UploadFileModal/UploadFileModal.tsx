import { FC, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { uploadFile } from '@api/files';

import { SideModal } from '@components/Modals';
import { Button } from '@components/Buttons';

import FolderLightIcon from '@media/UI/folder-light.svg';
import FolderDarkIcon from '@media/UI/folder-dark.svg';

import UploadLightIcon from '@media/UI/upload-light.svg';
import UploadDarkIcon from '@media/UI/upload-dark.svg';

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
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);

  const [fileToUpload, setFileToUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setFileToUpload(acceptedFiles[0]);
    },
  });

  const handleUpload = () => {
    if (fileToUpload) {
      uploadFile({
        file: fileToUpload,
        directory: directoryName,
        podName: activePod,
      })
        .then(() => {
          refreshDrive();
          closeModal();
        })
        .catch(() => {
          setErrorMessage('File could not be uploaded!');
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
        />
      </div>

      {errorMessage ? (
        <div className="my-28 text-color-status-negative-day text-xs text-center leading-none">
          {errorMessage}
        </div>
      ) : null}
    </SideModal>
  );
};

export default UploadFileModal;
