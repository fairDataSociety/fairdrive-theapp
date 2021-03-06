import { FC, useContext, useState } from 'react';
import FileSaver from 'file-saver';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import PodContext from '@context/PodContext';

import { downloadFile, deleteFile } from '@api/files';
import { deleteDirectory } from '@api/directory';

import { DriveItemDropdownToggle } from '@components/Buttons';
import { ShareFileModal, ConfirmDeleteModal } from '@components/Modals';

import formatDirectory from '@utils/formatDirectory';

interface DriveItemDropdownProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  openClick: () => void;
  updateDrive: () => void;
}

const DriveDropdown: FC<DriveItemDropdownProps> = ({
  type,
  data,
  openClick,
  updateDrive,
}) => {
  const { trackEvent } = useMatomo();
  const { activePod, directoryName } = useContext(PodContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareFileModal, setShowShareFileModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenClick = () => {
    setShowDropdown(false);
    openClick();
  };

  const handleDownloadClick = () => {
    setShowDropdown(false);

    downloadFile({
      filename: data?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then((response) => {
        FileSaver.saveAs(response, data?.name);

        trackEvent({
          category: 'File',
          action: `Download File`,
          name: `Download File: ${data?.name}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });
      })
      .catch(() => {
        console.log('File could not be downloaded!');
      });
  };

  const handleShareClick = () => {
    setShowDropdown(false);
    setShowShareFileModal(true);
  };

  const handleDeleteClick = () => {
    setShowDropdown(false);
    setShowConfirmDeleteModal(true);
  };

  const handleDeleteFile = () => {
    setShowDropdown(false);

    deleteFile({
      file_name: data?.name,
      podName: activePod,
      path: formatDirectory(directoryName),
    })
      .then(() => {
        trackEvent({
          category: 'File',
          action: `Delete File`,
          name: `Delete File: ${data?.name}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });

        setShowConfirmDeleteModal(false);
        updateDrive();
      })
      .catch(() => {
        console.log('File could not be deleted!');
      });
  };

  const handleDeleteFolder = () => {
    setShowDropdown(false);

    const deletePath =
      (directoryName !== 'root' ? '/' + directoryName + '/' : '/') + data.name;

    deleteDirectory({
      podName: activePod,
      path: deletePath,
    })
      .then(() => {
        trackEvent({
          category: 'Folder',
          action: `Delete Folder`,
          name: `Delete Folder: ${data?.name}`,
          documentTitle: 'Drive Page',
          href: window.location.href,
        });

        setShowConfirmDeleteModal(false);
        updateDrive();
      })
      .catch(() => {
        console.log('Folder could not be deleted!');
      });
  };

  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <DriveItemDropdownToggle onClickHandler={handleToggleDropdown} />

      {showDropdown ? (
        <div className="absolute -left-32 w-48 p-5 bg-color-shade-dark-1-day dark:bg-color-shade-dark-3-night text-left rounded-md shadow z-30">
          <h4 className="mb-3 pb-3 font-semibold text-color-shade-white-day dark:text-color-shade-white-night text-base border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night">
            Preview
          </h4>

          <div className="space-y-4">
            <span
              className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
              onClick={handleOpenClick}
            >
              Open
            </span>

            {type === 'file' ? (
              <span
                className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
                onClick={handleDownloadClick}
              >
                Download
              </span>
            ) : null}

            {type === 'file' ? (
              <span
                className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
                onClick={handleShareClick}
              >
                Share
              </span>
            ) : null}

            <span
              className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
              onClick={handleDeleteClick}
            >
              Delete
            </span>
          </div>
        </div>
      ) : null}

      {showShareFileModal ? (
        <ShareFileModal
          showModal={showShareFileModal}
          closeModal={() => setShowShareFileModal(false)}
          fileName={data?.name}
          podName={activePod}
          path={formatDirectory(directoryName)}
        />
      ) : null}

      {showConfirmDeleteModal ? (
        <ConfirmDeleteModal
          showModal={showConfirmDeleteModal}
          closeModal={() => setShowConfirmDeleteModal(false)}
          type={type}
          name={data?.name}
          deleteHandler={
            type === 'file' ? handleDeleteFile : handleDeleteFolder
          }
        />
      ) : null}
    </div>
  );
};

export default DriveDropdown;
