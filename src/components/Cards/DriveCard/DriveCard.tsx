import { FC } from 'react';
import prettyBytes from 'pretty-bytes';

import DriveCardIcon from '@components/Cards/DriveCard/DriveCardIcon/DriveCardIcon';
import { DriveItemDropdown } from '@components/Dropdowns';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';

interface DriveCardProps {
  type: 'folder' | 'file';
  data: {
    name: string;
    size: string;
    creation_time: string;
  };
  onClick: () => void;
  updateDrive: () => void;
}

const DriveCard: FC<DriveCardProps> = ({
  type,
  data,
  onClick,
  updateDrive,
}) => {
  return (
    <div
      className="w-68 h-60 m-3 p-6 dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-accents-purple-black rounded-md shadow-lg cursor-pointer dark:hover:shadow-soft-purple hover:shadow-soft-purple"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <DriveCardIcon
          type={type}
          fileExtention={type === 'file' ? data.name.split('.').pop() : ''}
        />

        <DriveItemDropdown
          type={type}
          data={data}
          openClick={onClick}
          updateDrive={updateDrive}
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
              {prettyBytes(parseInt(data?.size))}
            </span>
          </div>
        ) : null}

        <div>
          <h4 className="mb-1 text-xs text-color-shade-light-3-day dark:text-color-shade-light-3-night uppercase">
            Date Added
          </h4>
          <span className="font-normal text-xs text-color-shade-light-2-day dark:text-color-shade-light-2-night uppercase">
            {formatDate(data?.creation_time, false)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DriveCard;
