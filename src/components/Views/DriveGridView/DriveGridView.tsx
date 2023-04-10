import { FC } from 'react';
import { DriveCard } from '@components/Cards';
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';

interface DriveGridViewProps {
  directories: DirectoryItem[];
  files: FileItem[];
  directoryOnClick: (directoryName: string) => void;
  fileOnClick: (data: FileItem) => void;
  updateDrive: () => void;
}

const DriveGridView: FC<DriveGridViewProps> = ({
  directories,
  files,
  directoryOnClick,
  fileOnClick,
  updateDrive,
}) => {
  return (
    <div className="flex flex-wrap h-full">
      {directories?.map((directory) => (
        <DriveCard
          key={directory.name}
          type="folder"
          data={{
            name: directory.name,
            size: directory.size,
            creationTime: (directory.raw as any)?.meta?.creationTime,
          }}
          onClick={() => directoryOnClick(directory.name)}
          updateDrive={updateDrive}
        />
      ))}

      {files?.map((data) => (
        <DriveCard
          key={data.name}
          type="file"
          data={{
            name: data.name,
            size: data.size,
            creationTime: (data.raw as any)?.creationTime,
          }}
          onClick={() => {
            fileOnClick(data);
          }}
          updateDrive={updateDrive}
        />
      ))}
    </div>
  );
};

export default DriveGridView;
