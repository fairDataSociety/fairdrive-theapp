import { FC } from 'react';

import FolderIcon from '@media/fileTypes/Directory.svg';
import FileIcon from '@media/fileTypes/File.svg';

interface DriveCardIconProps {
  type: 'folder' | 'file';
  fileExtention: string;
}

const DriveCardIcon: FC<DriveCardIconProps> = ({ type, fileExtention }) => {
  return (
    <div className="">
      <span className="flex text-color-accents-grey-lavendar dark:text-color-shade-dark-1-night">
        <div className="mx-auto lg:mx-0">
          {type === 'folder' ? (
            <FolderIcon className="inline-block mb-3" />
          ) : (
            <FileIcon />
          )}
        </div>
      </span>

      {type === 'file' ? (
        <span className="block -mt-10 mb-5 lg:mb-10 ml-0 text-center text-ellipsis lg:text-center text-color-shade-black-day dark:text-color-accents-grey-pastel uppercase">
          {(fileExtention || '').substring(0, 5)}
        </span>
      ) : null}
    </div>
  );
};

export default DriveCardIcon;
