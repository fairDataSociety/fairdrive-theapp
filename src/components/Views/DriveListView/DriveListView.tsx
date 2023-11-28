import { FC, useMemo, useState } from 'react';

import {
  DriveTableHeader,
  DriveTableItem,
  DriveTableFooter,
} from '@components/Tables';
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveListViewProps extends UpdateDriveProps {
  directories: DirectoryItem[];
  files: FileItem[];
  directoryOnClick: (directory: DirectoryItem) => void;
  fileOnClick: (data: FileItem) => void;
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
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const { pageDirectories, pageFiles } = useMemo(
    () => ({
      pageDirectories: (directories || []).slice(startIndex, endIndex),
      pageFiles: (files || []).slice(
        startIndex - directories.length,
        endIndex - directories.length
      ),
    }),
    [directories, files, startIndex, endIndex]
  );

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
    <div className="h-full mb-32">
      <table className="w-full h-auto table-auto shadow">
        <DriveTableHeader />

        <tbody>
          {pageDirectories.map((directory) => (
            <DriveTableItem
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

          {pageFiles.map((data) => (
            <DriveTableItem
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
        </tbody>
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
