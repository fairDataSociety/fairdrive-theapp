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

  const [directories, setDirectories] = useState(null);
  const [files, setFiles] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activePod) handleFetchDrive();
    }, 500);

    return () => clearTimeout(timeout);
  }, [activePod, directoryName, openPods]);

  const handleFetchDrive = async () => {
    getFilesAndDirectories(activePod, directoryName || 'root')
      .then((response) => {
        setFiles(response.files);
        setDirectories(response.dirs);
      })
      .catch(() => console.log('Error: Could not fetch directories & files!'));
  };

  return (
    <MainLayout>
      <MainHeader title={`${activePod} / ${directoryName}`} />

      <DriveActionBar refreshDrive={handleFetchDrive} />

      <div className="flex flex-wrap h-full">
        {directories?.map((directory: FileResponse) => (
          <FileCard
            data={directory}
            key={directory.name}
            isDirectory={true}
            onDirectoryClick={() => {
              setDirectoryName(directory.name);
            }}
          />
        ))}

        {files?.map((data: FileResponse) => (
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
          updateDrive={handleFetchDrive}
        />
      ) : null}
    </MainLayout>
  );
};

export default Drive;
