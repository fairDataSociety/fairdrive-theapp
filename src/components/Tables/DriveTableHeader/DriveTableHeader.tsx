import { FC } from 'react';

const DriveTableHeader: FC = () => {
  const tableHeadingClasses =
    'pl-4 font-medium text-color-accents-plum-black dark:text-color-shade-light-1-night text-left text-base';

  return (
    <tr className="relative w-full h-16 bg-color-shade-dark-4-day border dark:bg-color-shade-dark-3-night border-color-shade-dark-4-day dark:border-color-shade-dark-3-night shadow-sm">
      <th className={tableHeadingClasses}>File Name</th>
      <th className={tableHeadingClasses}>File Type</th>
      <th className={tableHeadingClasses}>File Size</th>
      <th className={tableHeadingClasses}>Created</th>
      <th>{/* Empty Table Header for Dropdown Menu */}</th>
    </tr>
  );
};

export default DriveTableHeader;
