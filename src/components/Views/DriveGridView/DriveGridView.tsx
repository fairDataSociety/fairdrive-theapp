import { FC } from 'react';

import { FileResponse } from '@api/files';

import { DriveCard } from '@components/Cards';

interface DriveGridViewProps {
  directories: FileResponse[];
  files: FileResponse[];
  directoryOnClick: (directoryName: string) => void;
  fileOnClick: (data: FileResponse) => void;
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
            ...directory,
            creationTime: String(directory.raw?.creationTime),
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
            ...data,
            creationTime: String(data.raw?.creationTime),
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
