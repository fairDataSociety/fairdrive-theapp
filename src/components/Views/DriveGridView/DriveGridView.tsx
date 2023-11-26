import { FC } from 'react';
import { DriveCard } from '@components/Cards';
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveGridViewProps extends UpdateDriveProps {
  directories: DirectoryItem[];
  files: FileItem[];
  directoryOnClick: (directory: DirectoryItem) => void;
  fileOnClick: (data: FileItem) => void;
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
          key={directory.path || directory.name}
          type="folder"
          data={{
            name: directory.name,
            size: directory.size,
            creationTime: (directory.raw as any)?.meta?.creationTime,
          }}
          onClick={() => directoryOnClick(directory)}
          updateDrive={updateDrive}
        />
      ))}

      {files?.map((data) => (
        <DriveCard
          key={data.path || data.name}
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
