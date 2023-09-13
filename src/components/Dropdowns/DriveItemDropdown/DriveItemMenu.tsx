import { FC, useContext, useState } from 'react';
import FileSaver from 'file-saver';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Menu } from '@headlessui/react';

import PodContext from '@context/PodContext';
import { useFdpStorage } from '@context/FdpStorageContext';

import { downloadFile, deleteFile } from '@api/files';
import { deleteDirectory } from '@api/directory';

import { ShareFileModal, ConfirmDeleteModal } from '@components/Modals';

import formatDirectory from '@utils/formatDirectory';
import { ContentType, removeItemFromCache } from '@utils/cache';
import { getFdpPathByDirectory } from '@api/pod';
import { UpdateDriveProps } from '@interfaces/handlers';
import DropdownTransition from '../DropdownTransition';
import { useLocales } from '@context/LocalesContext';

interface DriveItemMenuProps extends UpdateDriveProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  handlePreviewClick?: () => void;
}

const DriveItemMenu: FC<DriveItemMenuProps> = ({
  type,
  data,
  updateDrive,
  handlePreviewClick,
}) => {
  const { trackEvent } = useMatomo();
  const { activePod, directoryName } = useContext(PodContext);
  const { fdpClientRef, getAccountAddress } = useFdpStorage();
  const [showShareFileModal, setShowShareFileModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const { intl } = useLocales();
  const previewLabel = intl.get(type === 'file' ? 'PREVIEW' : 'OPEN');

  const handleDownloadClick = async () => {
    try {
      const response = await downloadFile(fdpClientRef.current, {
        filename: data?.name,
        directory: directoryName,
        podName: activePod,
      });

      FileSaver.saveAs(response, data?.name);

      trackEvent({
        category: 'File',
        action: `Download File`,
        name: `Download File: ${data?.name}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });
    } catch (error) {
      console.log('File could not be downloaded!');
    }
  };

  const handleShareClick = () => {
    setShowShareFileModal(true);
  };

  const handleDeleteClick = () => {
    setShowConfirmDeleteModal(true);
  };

  const handleDeleteFile = async () => {
    const userAddress = await getAccountAddress();
    const directory = directoryName || 'root';
    const fdpPath = getFdpPathByDirectory(directory);
    const itemName = data?.name;
    try {
      await deleteFile(fdpClientRef.current, {
        file_name: itemName,
        podName: activePod,
        path: formatDirectory(directoryName),
      });

      trackEvent({
        category: 'File',
        action: `Delete File`,
        name: `Delete File: ${itemName}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });

      setShowConfirmDeleteModal(false);
      removeItemFromCache(
        userAddress,
        activePod,
        fdpPath,
        itemName,
        ContentType.FILE
      );
      updateDrive({
        isUseCacheOnly: true,
      });
    } catch (error) {
      console.log('File could not be deleted!');
    }
  };

  const handleDeleteFolder = async () => {
    const userAddress = await getAccountAddress();
    const directory = directoryName || 'root';
    const fdpPath = getFdpPathByDirectory(directory);
    const itemName = data?.name;
    const deletePath =
      (directoryName !== 'root' ? '/' + directoryName + '/' : '/') + data.name;

    try {
      await deleteDirectory(fdpClientRef.current, {
        podName: activePod,
        path: deletePath,
      });

      trackEvent({
        category: 'Folder',
        action: `Delete Folder`,
        name: `Delete Folder: ${data?.name}`,
        documentTitle: 'Drive Page',
        href: window.location.href,
      });

      setShowConfirmDeleteModal(false);
      removeItemFromCache(
        userAddress,
        activePod,
        fdpPath,
        itemName,
        ContentType.DIRECTORY
      );
      updateDrive({
        isUseCacheOnly: true,
      });
    } catch (error) {
      console.log('Folder could not be deleted!');
    }
  };

  return (
    <>
      <DropdownTransition>
        <Menu.Items className="absolute -left-32 w-48 p-5 z-10 bg-color-shade-dark-1-day dark:bg-color-shade-dark-3-night text-left rounded-md shadow">
          <Menu.Item
            as="h4"
            className="mb-3 pb-3 font-semibold text-color-shade-white-day dark:text-color-shade-white-night text-base border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night cursor-pointer"
          >
            <span onClick={handlePreviewClick}>{previewLabel}</span>
          </Menu.Item>

          <div className="space-y-4">
            {type === 'file' ? (
              <Menu.Item
                as="span"
                className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
                onClick={handleDownloadClick}
              >
                {intl.get('DOWNLOAD')}
              </Menu.Item>
            ) : null}

            {type === 'file' ? (
              <Menu.Item
                as="span"
                className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
                onClick={handleShareClick}
              >
                {intl.get('SHARE')}
              </Menu.Item>
            ) : null}

            <Menu.Item
              as="span"
              className="block w-auto font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
              onClick={handleDeleteClick}
            >
              {intl.get('DELETE')}
            </Menu.Item>
          </div>
        </Menu.Items>
      </DropdownTransition>

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
    </>
  );
};

export default DriveItemMenu;
