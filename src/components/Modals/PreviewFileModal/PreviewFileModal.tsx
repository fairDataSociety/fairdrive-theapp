import { FC, useContext, useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import FileSaver from 'file-saver';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useFdpStorage } from '@context/FdpStorageContext';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { downloadFile, deleteFile } from '@api/files';

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
import FilePreview from '@components/FilePreview/FilePreview';
import { FileItem } from '@fairdatasociety/fdp-storage';
import { extractFileExtension } from '@utils/filename';
import { useLocales } from '@context/LocalesContext';

interface PreviewModalProps {
  showModal: boolean;
  closeModal: () => void;
  previewFile: FileItem;
  updateDrive: () => void;
}

const PreviewFileModal: FC<PreviewModalProps> = ({
  showModal,
  closeModal,
  previewFile,
  updateDrive,
}) => {
  const { fdpClientRef } = useFdpStorage();
  const { trackEvent } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);
  const [loading, setLoading] = useState(false);

  const [imageSource, setImageSource] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showShareFileModal, setShowShareFileModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const { intl } = useLocales();

  useEffect(() => {
    setLoading(true);
    downloadFile(fdpClientRef.current, {
      filename: previewFile?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then(async (response) => {
        const blob = await response.arrayBuffer();
        const content = new Blob([blob]);

        if (previewFile?.name.endsWith('.json')) {
          const json = await content.text();
          return setImageSource(JSON.parse(json));
        }

        setImageSource(window.URL.createObjectURL(content));
      })
      .catch((e) => {
        setErrorMessage(intl.get('FILE_PREVIEW_ERROR'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownloadFile = () => {
    setLoading(true);

    downloadFile(fdpClientRef.current, {
      filename: previewFile?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then((response) => {
        FileSaver.saveAs(response, previewFile?.name);
        trackEvent({
          category: 'File',
          action: `Download File`,
          name: `Download File: ${previewFile?.name}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });
      })
      .catch(() => {
        console.log('File could not be downloaded!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteFile = () => {
    setLoading(true);

    deleteFile(fdpClientRef.current, {
      file_name: previewFile?.name,
      podName: activePod,
      path: formatDirectory(directoryName),
    })
      .then(() => {
        trackEvent({
          category: 'File',
          action: `Delete File`,
          name: `Delete File: ${previewFile?.name}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });

        updateDrive();
        closeModal();
      })
      .catch(() => {
        console.log('File could not be deleted!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <SideModal
        showModal={showModal}
        closeModal={closeModal}
        headerIcon={{
          light: <FolderLightIcon />,
          dark: <FolderDarkIcon />,
        }}
        headerTitle={intl.get('PREVIEW_FILE')}
        className="w-full md:w-98"
      >
        {imageSource ? (
          <FilePreview
            file={previewFile}
            source={imageSource}
            pod={activePod}
            directory={directoryName}
            onError={() => setErrorMessage(intl.get('FILE_PREVIEW_ERROR'))}
          />
        ) : null}
        <Spinner isLoading={loading} />

        {errorMessage ? (
          <div className="my-28 text-color-status-negative-day text-xs text-center leading-none">
            {errorMessage}
          </div>
        ) : null}

        <h2 className="text-base text-color-accents-purple-black dark:text-color-shade-white-night">
          {previewFile?.name}
        </h2>

        <div className="flex justify-between items-center w-full mt-5">
          <div>
            <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
              {intl.get('FILE_SIZE')}
            </h4>
            <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
              {previewFile?.size && prettyBytes(previewFile?.size)}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
              {intl.get('FILE_TYPE')}
            </h4>
            <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
              {(previewFile?.raw as any)?.contentType ||
                extractFileExtension(previewFile.name)?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
            {intl.get('CREATED')}
          </h4>
          <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
            {(previewFile?.raw as any)?.creationTime &&
              formatDate(String((previewFile?.raw as any)?.creationTime), true)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-10">
          {/* <span
            onClick={() => console.log('todo...')}
            className="cursor-pointer"
          >
            {theme === 'light' ? (
              <GlobeLightIcon className="inline-block" />
            ) : (
              <GlobeDarkIcon className="inline-block" />
            )}
          </span> */}

          <span onClick={handleDownloadFile} className="cursor-pointer">
            {theme === 'light' ? (
              <DownloadLightIcon className="inline-block" />
            ) : (
              <DownloadDarkIcon className="inline-block" />
            )}
          </span>

          <span
            onClick={() => setShowShareFileModal(true)}
            className="cursor-pointer"
          >
            {theme === 'light' ? (
              <ShareLightIcon className="inline-block" />
            ) : (
              <ShareDarkIcon className="inline-block" />
            )}
          </span>

          <span
            onClick={() => setShowConfirmDeleteModal(true)}
            className="cursor-pointer"
          >
            {theme === 'light' ? (
              <DeleteLightIcon className="inline-block" />
            ) : (
              <DeleteDarkIcon className="inline-block" />
            )}
          </span>
        </div>
      </SideModal>

      <ShareFileModal
        showModal={showShareFileModal}
        closeModal={() => setShowShareFileModal(false)}
        fileName={previewFile?.name}
        podName={activePod}
        path={formatDirectory(directoryName)}
      />

      <ConfirmDeleteModal
        showModal={showConfirmDeleteModal}
        closeModal={() => setShowConfirmDeleteModal(false)}
        type="file"
        name={previewFile?.name}
        deleteHandler={handleDeleteFile}
      />
    </>
  );
};

export default PreviewFileModal;
