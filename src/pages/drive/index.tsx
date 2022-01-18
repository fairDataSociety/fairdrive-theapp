/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import FileCard from '@components/FileCard/FileCard';
import { getFilesAndDirectories } from '@api/pod';
import { FileResponse } from '@api/files';
import PodContext from '@context/PodContext';
import DriveActionButtonBar from '@components/NavigationBars/DriveActionButtonBar/DriveActionButtonBar';
import { PreviewFileModal } from '@components/Modals';

interface DriveProps {}

const Drive: FC<DriveProps> = () => {
  const { activePod, openPods, directoryName, setDirectoryName } =
    useContext(PodContext);
  const [files, setFiles] = useState(null);
  const [directories, setDirectories] = useState(null);
  const [createdNewItem, setCreatedNewItem] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const fetchFiles = async () => {
    if (directoryName !== '') {
      const response = await getFilesAndDirectories(activePod, directoryName);
      setFiles(response.files);
      setDirectories(response.dirs);
    } else {
      const response = await getFilesAndDirectories(activePod, 'root');
      setFiles(response.files);
      setDirectories(response.dirs);
    }
  };

  const reloadFiles = async () => {
    if (createdNewItem) {
      const response = await getFilesAndDirectories(activePod, directoryName);
      setFiles(response.files);
      setDirectories(response.dirs);
      setCreatedNewItem(false);
    }
  };

  useEffect(() => {
    reloadFiles();
  }, [createdNewItem]);

  useEffect(() => {
    // Added 0.3s delay to prevent the API call from being before pod is opened
    const timeout = setTimeout(() => {
      if (activePod !== '') fetchFiles();
    }, 300);

    if (activePod === '') {
      setFiles(null);
      setDirectories(null);
    }
    return () => clearTimeout(timeout);
  }, [activePod, directoryName, openPods, createdNewItem]);

  return (
    <MainLayout>
      <MainHeader title={activePod} />
      <DriveActionButtonBar
        createdFile={createdNewItem}
        setCreatedFile={setCreatedNewItem}
      ></DriveActionButtonBar>
      <div className="h-full overflow-scroll flex flex-wrap">
        {directories &&
          directories.map((directory: FileResponse) => (
            <FileCard
              data={directory}
              key={directory.name}
              isDirectory={true}
              onDirectoryClick={() => {
                setDirectoryName(directory.name);
              }}
            ></FileCard>
          ))}
        {files &&
          files.map((data: FileResponse) => (
            <FileCard
              data={data}
              key={data.name}
              isDirectory={false}
              onFileClick={() => {
                setPreviewFile(data);
                setShowPreviewModal(true);
              }}
            ></FileCard>
          ))}
      </div>

      {showPreviewModal ? (
        <PreviewFileModal
          showModal={showPreviewModal}
          closeModal={() => setShowPreviewModal(false)}
          previewFile={previewFile}
        />
      ) : null}
    </MainLayout>
  );
};

export default Drive;
