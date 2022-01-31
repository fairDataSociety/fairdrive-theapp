import { FC, useContext } from 'react';
import prettyBytes from 'pretty-bytes';

import ThemeContext from '@context/ThemeContext';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';

interface DriveTableItemProps {
  type: 'folder' | 'file';
  data: {
    name: string;
    size: string;
    creation_time: string;
  };
  onClick: () => void;
}

const DriveTableItem: FC<DriveTableItemProps> = ({ type, data, onClick }) => {
  const { theme } = useContext(ThemeContext);

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
        {type === 'file' ? data.name.split('.').pop().toUpperCase() : '-'}
      </td>
      <td className={`${tableDataClasses} dark:text-color-shade-light-2-night`}>
        {type === 'file' ? prettyBytes(parseInt(data?.size)) : '-'}
      </td>
      <td className={`${tableDataClasses} dark:text-color-shade-light-2-night`}>
        {formatDate(data?.creation_time, false)}
      </td>
      <td className="text-center">
        <span
          className="px-4"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {theme === 'light' ? (
            <DropdownMenuIconLight />
          ) : (
            <DropdownMenuIconDark />
          )}
        </span>
      </td>
    </tr>
  );
};

export default DriveTableItem;
