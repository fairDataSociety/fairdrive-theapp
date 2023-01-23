import { FC, useState } from 'react';

import { FileResponse } from '@api/files';

import {
  DriveTableHeader,
  DriveTableItem,
  DriveTableFooter,
} from '@components/Tables';

interface DriveListViewProps {
  directories: FileResponse[];
  files: FileResponse[];
  directoryOnClick: (directoryName: string) => void;
  fileOnClick: (data: FileResponse) => void;
  updateDrive: () => void;
}

const DriveListView: FC<DriveListViewProps> = ({
  directories,
  files,
  directoryOnClick,
  fileOnClick,
  updateDrive,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageUp = () => {
    if (
      page + 1 <
      ((directories?.length | 0) + (files?.length | 0)) / rowsPerPage
    ) {
      setPage(page + 1);
    }
  };

  const handlePageDown = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="h-full">
      <table className="w-full h-auto table-auto shadow">
        <DriveTableHeader />

        {directories
          ?.slice(page * rowsPerPage, page * rowsPerPage + (rowsPerPage + 1))
          .map((directory) => (
            <DriveTableItem
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

        {files
          ?.slice(page * rowsPerPage, page * rowsPerPage + (rowsPerPage + 1))
          .map((data) => (
            <DriveTableItem
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
      </table>

      <DriveTableFooter
        page={page}
        rowsPerPage={rowsPerPage}
        totalDriveItems={(directories?.length | 0) + (files?.length | 0)}
        updateRowsPerPage={(newRows: number) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
        pageUp={handlePageUp}
        pageDown={handlePageDown}
      />
    </div>
  );
};

export default DriveListView;
