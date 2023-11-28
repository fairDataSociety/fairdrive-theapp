import { FC, useContext, useRef, useState } from 'react';
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
import { FileItem, UploadProgressInfo } from '@fairdatasociety/fdp-storage';
import ProgressBar from '@components/ProgressBar/ProgressBar';

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

  const [filesToUpload, setFilesToUpload] = useState<File[]>(null);
  const uploadedItemsRef = useRef<FileItem[]>([]);
  const [failedUplods, setFailedUplods] = useState<File[]>([]);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { fdpClientRef, getAccountAddress } = useFdpStorage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      uploadedItemsRef.current = [];
      setFailedUplods([]);
      setErrorMessage('');
      if (activePod) {
        setFilesToUpload(acceptedFiles);
      }
    },
  });
  const { intl } = useLocales();

  const onClose = async () => {
    if (uploadedItemsRef.current.length > 0) {
      const userAddress = await getAccountAddress();
      const directory = directoryName || 'root';
      const fdpPath = getFdpPathByDirectory(directory);

      setMessage(intl.get('SUCCESSFULLY_UPLOADED'));

      uploadedItemsRef.current.forEach((item) =>
        addItemToCache(userAddress, activePod, fdpPath, item, ContentType.FILE)
      );

      trackEvent({
        category: 'Upload',
        action: `Upload File`,
        name: `Upload File`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });

      updateDrive({
        isUseCacheOnly: true,
      });
    }

    closeModal();
  };

  const calculateUploadPercentage = (
    completedCount: number,
    totalCount: number,
    currentPercentage: number
  ): number => {
    return (
      ((completedCount * 100 + currentPercentage) / (totalCount * 100)) * 100
    );
  };

  const handleUpload = async () => {
    setErrorMessage('');

    if (loading || !(filesToUpload && activePod)) {
      return;
    }

    setLoading(true);
    setUploadPercentage(0);

    try {
      setFailedUplods([]);

      await filesToUpload.reduce(async (prevUpload, file) => {
        try {
          await prevUpload;

          if (uploadedItemsRef.current.some(({ name }) => name === file.name)) {
            return;
          }

          const item = await uploadFile(
            fdpClientRef.current,
            {
              file,
              directory: directoryName,
              podName: activePod,
            },
            (event: UploadProgressInfo) => {
              const { uploadPercentage } = event.data || {};

              if (uploadPercentage) {
                setUploadPercentage(
                  calculateUploadPercentage(
                    uploadedItemsRef.current.length + failedUplods.length,
                    filesToUpload.length,
                    uploadPercentage
                  )
                );
              }
            }
          );

          uploadedItemsRef.current.push(item);
        } catch (error) {
          setFailedUplods((failedUplods) => [...failedUplods, file]);
          setUploadPercentage(
            calculateUploadPercentage(
              uploadedItemsRef.current.length + failedUplods.length,
              filesToUpload.length,
              100
            )
          );
        }
      }, Promise.resolve());

      if (uploadedItemsRef.current.length === filesToUpload.length) {
        onClose();
      } else {
        throw new Error("Some files weren't uploaded successfully.");
      }
    } catch (e) {
      setErrorMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getFileUploadStatus = (
    file: File
  ): 'pending' | 'success' | 'failed' => {
    if (uploadedItemsRef.current.some((item) => item.name === file.name)) {
      return 'success';
    }
    if (failedUplods.some((failedFile) => failedFile.name === file.name)) {
      return 'failed';
    }
    return 'pending';
  };

  return (
    <SideModal
      showModal={showModal}
      closeModal={onClose}
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

      {filesToUpload &&
        filesToUpload.map((file) => {
          const status = getFileUploadStatus(file);
          return (
            <p
              key={file.name}
              className={`mt-5 text-sm text-center text-color-shade-light-2-night ${
                status === 'success' ? 'text-color-status-positive-day' : ''
              } ${status === 'failed' ? 'text-color-status-negative-day' : ''}`}
            >
              {status === 'pending' && intl.get('READY_TO_UPLOAD')}{' '}
              <strong>{file?.name}</strong>
            </p>
          );
        })}

      {errorMessage ? (
        <div className="mt-10 text-color-status-negative-day text-xs text-center leading-none">
          {errorMessage}
        </div>
      ) : null}

      {loading && <ProgressBar className="mt-3" percent={uploadPercentage} />}

      <div className="mt-14 text-center">
        <Button
          type="button"
          variant="primary-outlined"
          label={intl.get('UPLOAD_CONTENT')}
          onClick={handleUpload}
          disabled={!filesToUpload || loading}
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
