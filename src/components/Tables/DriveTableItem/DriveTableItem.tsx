import { FC } from 'react';
import prettyBytes from 'pretty-bytes';
import { Menu } from '@headlessui/react';

import { DriveItemDropdown } from '@components/Dropdowns';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';
import { extractFileExtension } from '@utils/filename';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveTableItemProps extends UpdateDriveProps {
  type: 'folder' | 'file';
  data: {
    name: string;
    size: number;
    creationTime: string;
  };
  onClick: () => void;
}

const DriveTableItem: FC<DriveTableItemProps> = ({
  type,
  data,
  onClick,
  updateDrive,
}) => {
  const tableDataClasses =
    'pl-4 font-normal text-color-accents-purple-black text-left';

  return (
    <tr
      className="w-full h-14 even:bg-color-shade-dark-3-day odd:bg-color-shade-dark-4-day dark:odd:bg-color-shade-dark-4-night dark:even:bg-color-shade-white-day border border-color-shade-black-day dark:border-color-accents-purple-black shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <td className={`${tableDataClasses} dark:text-color-shade-light-1-night`}>
        {shortenString(data.name.split('.').shift(), 24)}
      </td>
      <td className={`${tableDataClasses} dark:text-color-shade-light-2-night`}>
        {type === 'file' ? extractFileExtension(data.name)?.toUpperCase() : '-'}
      </td>
      <td className={`${tableDataClasses} dark:text-color-shade-light-2-night`}>
        {type === 'file' ? prettyBytes(data?.size) : '-'}
      </td>
      <td className={`${tableDataClasses} dark:text-color-shade-light-2-night`}>
        {formatDate(data?.creationTime, false)}
      </td>
      <td className="text-center">
        <Menu as="div">
          <DriveItemDropdown
            type={type}
            data={data}
            updateDrive={updateDrive}
          />
        </Menu>
      </td>
    </tr>
  );
};

export default DriveTableItem;
