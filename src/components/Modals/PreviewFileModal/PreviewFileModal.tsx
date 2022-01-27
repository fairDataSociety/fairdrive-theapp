import { FC, useContext, useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import FileSaver from 'file-saver';

import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';

import { downloadFile, deleteFile } from '@api/files';

import { SideModal } from '@components/Modals';
import { ShareFileModal } from '@components/Modals';

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

interface PreviewModalProps {
  showModal: boolean;
  closeModal: () => void;
  previewFile: any;
  updateDrive: () => void;
}

const PreviewFileModal: FC<PreviewModalProps> = ({
  showModal,
  closeModal,
  previewFile,
  updateDrive,
}) => {
  const { theme } = useContext(ThemeContext);
  const { activePod, directoryName } = useContext(PodContext);

  const [imageSource, setImageSource] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showShareFileModal, setShowShareFileModal] = useState(false);

  useEffect(() => {
    downloadFile({
      filename: previewFile?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then((response) => setImageSource(window.URL.createObjectURL(response)))
      .catch(() => {
        setErrorMessage('File preview could not be loaded!');
      });
  }, []);

  const handleDownloadFile = () => {
    downloadFile({
      filename: previewFile?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then((response) => FileSaver.saveAs(response, previewFile?.name))
      .catch(() => {
        console.log('File could not be downloaded!');
      });
  };

  const handleDeleteFile = () => {
    deleteFile({
      file_name: previewFile?.name,
      podName: activePod,
      path: formatDirectory(directoryName),
    })
      .then(() => {
        updateDrive();
        closeModal();
      })
      .catch(() => {
        console.log('File could not be deleted!');
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
        headerTitle="Preview File"
      >
        {imageSource ? (
          <img
            src={imageSource}
            alt="Preview Image"
            className="w-full h-auto my-10 rounded"
            onError={() => setErrorMessage('File preview could not be loaded!')}
          />
        ) : null}

        {errorMessage ? (
          <div className="my-28 text-color-status-negative-day text-xs text-center leading-none">
            {errorMessage}
          </div>
        ) : null}

        <h2 className="font-semibold text-2xl text-color-accents-purple-black dark:text-color-shade-white-night">
          {previewFile?.name}
        </h2>

        <div className="flex justify-between items-center w-full mt-5">
          <div>
            <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
              File size
            </h4>
            <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
              {previewFile?.size && prettyBytes(parseInt(previewFile?.size))}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
              File type
            </h4>
            <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
              {previewFile?.content_type}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="font-bold text-base text-color-accents-purple-black dark:text-color-shade-white-night">
            Created
          </h4>
          <span className="font-normal text-xs text-color-accents-purple-black dark:text-color-shade-light-2-night">
            {previewFile?.creation_time &&
              formatDate(previewFile?.creation_time, true)}
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

          <span onClick={handleDeleteFile} className="cursor-pointer">
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
    </>
  );
};

export default PreviewFileModal;
