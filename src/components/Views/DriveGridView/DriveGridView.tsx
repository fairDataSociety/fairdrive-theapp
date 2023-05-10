import { FC } from 'react';
import { DriveCard } from '@components/Cards';
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveGridViewProps extends UpdateDriveProps {
  directories: DirectoryItem[];
  files: FileItem[];
  directoryOnClick: (directoryName: string) => void;
  fileOnClick: (data: FileItem) => void;
  dropdownOpenFileName: string;
  onDropdownFileNameChange: (fileName: string) => void;
}

const DriveGridView: FC<DriveGridViewProps> = ({
  directories,
  files,
  directoryOnClick,
  fileOnClick,
  updateDrive,
  dropdownOpenFileName,
  onDropdownFileNameChange,
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
          dropdownOpen={directory.name === dropdownOpenFileName}
          onDropdownOpenChange={(open: boolean) =>
            onDropdownFileNameChange(open ? directory.name : null)
          }
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
          dropdownOpen={data.name === dropdownOpenFileName}
          onDropdownOpenChange={(open: boolean) =>
            onDropdownFileNameChange(open ? data.name : null)
          }
        />
      ))}
    </div>
  );
};

export default DriveGridView;
