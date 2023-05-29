import { FC } from 'react';
import prettyBytes from 'pretty-bytes';
import { Menu } from '@headlessui/react';

import DriveCardIcon from '@components/Cards/DriveCard/DriveCardIcon/DriveCardIcon';
import { DriveItemDropdown } from '@components/Dropdowns';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';
import DriveItemMenu from '@components/Dropdowns/DriveItemDropdown/DriveItemMenu';
import { extractFileExtension } from '@utils/filename';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveCardProps extends UpdateDriveProps {
  type: 'folder' | 'file';
  data: {
    name: string;
    size: number;
    creationTime: number;
  };
  onClick: () => void;
  handlePreviewClick?: () => void;
}

const DriveCard: FC<DriveCardProps> = ({
  type,
  data,
  onClick,
  updateDrive,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="w-32 mb-2 py-2 flex-column lg:hidden cursor-pointer dark:hover:shadow-soft-purple hover:shadow-soft-purple">
        <DriveCardIcon
          type={type}
          fileExtention={type === 'file' ? extractFileExtension(data.name) : ''}
        />

        <div className="relative ml-auto" style={{ width: '1px' }}>
          <DriveItemMenu
            data={data}
            type={type}
            updateDrive={updateDrive}
            handlePreviewClick={onClick}
          />
        </div>

        <h4 className="text-sm md:text-base overflow-x-hidden lg:overflow-x-auto font-medium text-center text-color-shade-light-1-day dark:text-color-shade-light-1-night">
          {shortenString(data.name, 24)}
        </h4>
      </Menu.Button>
      <div
        className="w-68 h-60 hidden lg:block m-3 p-6 dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-accents-purple-black rounded-md shadow-lg cursor-pointer dark:hover:shadow-soft-purple hover:shadow-soft-purple"
        onClick={onClick}
      >
        <div className="flex justify-between items-start">
          <DriveCardIcon
            type={type}
            fileExtention={
              type === 'file' ? extractFileExtension(data.name) : ''
            }
          />

          <DriveItemDropdown
            type={type}
            data={data}
            updateDrive={updateDrive}
            handlePreviewClick={onClick}
          />
        </div>

        <div className="mb-5 pb-5 border-b border-color-shade-dark-2-day dark:border-color-shade-dark-2-night">
          <h3 className="font-medium text-base text-color-shade-light-1-day dark:text-color-shade-light-1-night">
            {shortenString(data.name, 24)}
          </h3>
        </div>

        <div className="flex justify-between items-center">
          {type === 'file' ? (
            <div>
              <h4 className="mb-1 text-xs text-color-shade-light-3-day dark:text-color-shade-light-3-night uppercase">
                File Size
              </h4>
              <span className="font-normal text-xs text-color-shade-light-2-day dark:text-color-shade-light-2-night uppercase">
                {prettyBytes(data?.size)}
              </span>
            </div>
          ) : null}

          <div>
            <h4 className="mb-1 text-xs text-color-shade-light-3-day dark:text-color-shade-light-3-night uppercase">
              Date Added
            </h4>
            <span className="font-normal text-xs text-color-shade-light-2-day dark:text-color-shade-light-2-night uppercase">
              {formatDate(String(data?.creationTime), false)}
            </span>
          </div>
        </div>
      </div>
    </Menu>
  );
};

export default DriveCard;
