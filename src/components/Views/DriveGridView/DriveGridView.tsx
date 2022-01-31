import { FC } from 'react';

import { FileResponse } from '@api/files';

import { DriveCard } from '@components/Cards';

interface DriveGridViewProps {
  directories: FileResponse[];
  files: FileResponse[];
  directoryOnClick: (directoryName: string) => void;
  fileOnClick: (data: FileResponse) => void;
}

const DriveGridView: FC<DriveGridViewProps> = ({
  directories,
  files,
  directoryOnClick,
  fileOnClick,
}) => {
  return (
    <div className="flex flex-wrap h-full">
      {directories?.map((directory) => (
        <DriveCard
          key={directory.name}
          type="folder"
          data={directory}
          onClick={() => directoryOnClick(directory.name)}
        />
      ))}

      {files?.map((data) => (
        <DriveCard
          key={data.name}
          type="file"
          data={data}
          onClick={() => {
            fileOnClick(data);
          }}
        />
      ))}
    </div>
  );
};

export default DriveGridView;
