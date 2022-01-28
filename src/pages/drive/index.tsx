/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect } from 'react';

import PodContext from '@context/PodContext';

import { getFilesAndDirectories } from '@api/pod';
import { FileResponse } from '@api/files';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import { DriveActionBar } from '@components/NavigationBars';
import { DriveCard } from '@components/Cards';
import { PreviewFileModal } from '@components/Modals';

const Drive: FC = () => {
  const { activePod, openPods, directoryName, setDirectoryName } =
    useContext(PodContext);

  const [directories, setDirectories] = useState(null);
  const [files, setFiles] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [driveSort, setDriveSort] = useState('a-z');

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

  const handleSort = (data: { name: string }[]) => {
    return data?.sort((a, b) =>
      (driveSort === 'a-z' ? a.name > b.name : a.name < b.name) ? 1 : -1
    );
  };

  const handleToggleSort = () => {
    if (driveSort === 'a-z') {
      setDriveSort('z-a');
    } else {
      setDriveSort('a-z');
    }
  };

  return (
    <MainLayout>
      <MainHeader
        title={`${activePod} / ${directoryName}`}
        toggleSort={handleToggleSort}
      />

      <DriveActionBar refreshDrive={handleFetchDrive} />

      <div className="flex flex-wrap h-full">
        {handleSort(directories)?.map((directory: FileResponse) => (
          <DriveCard
            key={directory.name}
            type="folder"
            data={directory}
            onClick={() => {
              setDirectoryName(directory.name);
            }}
          />
        ))}

        {handleSort(files)?.map((data: FileResponse) => (
          <DriveCard
            key={data.name}
            type="file"
            data={data}
            onClick={() => {
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
