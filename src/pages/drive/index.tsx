/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import FileCard from '@components/FileCard/FileCard';
import { getFilesAndDirectories } from '@api/pod';
import { FileResponse } from '@api/files';
import PodContext from '@context/PodContext';

interface DriveProps {}

const Drive: FC<DriveProps> = () => {
  const { activePod, openPods, directoryName, setDirectoryName } =
    useContext(PodContext);
  const [files, setFiles] = useState(null);
  const [directories, setDirectories] = useState(null);
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
  useEffect(() => {
    // Added 0.3s delay to prevent the API call from being before pod is opened
    const timeout = setTimeout(() => {
      if (activePod !== '') fetchFiles();
    }, 300);

    return () => clearTimeout(timeout);
  }, [activePod, directoryName, openPods]);
  return (
    <MainLayout>
      <MainHeader title="Private Pod" />
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
                // TODO Store file name and activate sideBar
                console.log(data.name);
              }}
            ></FileCard>
          ))}
      </div>
    </MainLayout>
  );
};

export default Drive;
