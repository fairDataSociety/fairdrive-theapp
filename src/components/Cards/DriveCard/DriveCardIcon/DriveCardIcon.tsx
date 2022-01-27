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
      <span className="text-color-accents-grey-lavendar dark:text-color-shade-dark-1-night z-10">
        {type === 'folder' ? (
          <FolderIcon className="inline-block mb-8" />
        ) : (
          <FileIcon />
        )}
      </span>

      {type === 'file' ? (
        <span className="block -mt-10 mb-10 ml-3 text-color-shade-black-day dark:text-color-accents-grey-pastel uppercase z-20">
          {fileExtention}
        </span>
      ) : null}
    </div>
  );
};

export default DriveCardIcon;
