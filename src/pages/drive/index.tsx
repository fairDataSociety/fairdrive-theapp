/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect } from 'react';

import PodContext from '@context/PodContext';

import { getFilesAndDirectories } from '@api/pod';
import { FileResponse } from '@api/files';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import { DriveActionBar } from '@components/NavigationBars';
import FileCard from '@components/FileCard/FileCard';
import { PreviewFileModal } from '@components/Modals';

const Drive: FC = () => {
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
    const response = await getFilesAndDirectories(activePod, directoryName);
    setFiles(response.files);
    setDirectories(response.dirs);
    setCreatedNewItem(false);
  };

  useEffect(() => {
    if (activePod !== '') reloadFiles();
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

      <DriveActionBar
        createdFile={createdNewItem}
        setCreatedFile={setCreatedNewItem}
        updateDrive={reloadFiles}
      />

      <div className="flex flex-wrap h-full">
        {directories &&
          directories.map((directory: FileResponse) => (
            <FileCard
              data={directory}
              key={directory.name}
              isDirectory={true}
              onDirectoryClick={() => {
                setDirectoryName(directory.name);
              }}
            />
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
            />
          ))}
      </div>

      {showPreviewModal ? (
        <PreviewFileModal
          showModal={showPreviewModal}
          closeModal={() => setShowPreviewModal(false)}
          previewFile={previewFile}
          updateDrive={reloadFiles}
        />
      ) : null}
    </MainLayout>
  );
};

export default Drive;
