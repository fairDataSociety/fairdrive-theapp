/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import FileCard from '@components/FileCard/FileCard';
import { getFilesAndDirectories, openPod } from '@api/pod';
import { FileResponse } from '@api/files';

interface DriveProps {}

const Drive: FC<DriveProps> = () => {
  const [files, setFiles] = useState(null);
  const [directories, setDirectories] = useState(null);
  const [directoryName, setDirectoryName] = useState('');
  const [openedPods, setOpenedPods] = useState([]);
  const fetchFiles = async () => {
    // Replace with state list of opened pods, podName
    if (!openedPods.includes('Home')) {
      await openPod('Home', 'test');
      openedPods.push('Home');
      setOpenedPods(openedPods);
    }
    if (directoryName !== '') {
      const response = await getFilesAndDirectories('Home', directoryName);
      setFiles(response.files);
      setDirectories(response.dirs);
    } else {
      const response = await getFilesAndDirectories('Home', 'root');
      setFiles(response.files);
      setDirectories(response.dirs);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, [directoryName]);
  return (
    <MainLayout>
      <MainHeader title="Private Pod" />
      <div className="flex flex-wrap">
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
                // Store file name and activate sideBar
                console.log(data.name);
              }}
            ></FileCard>
          ))}
      </div>
    </MainLayout>
  );
};

export default Drive;
