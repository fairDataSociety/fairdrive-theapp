import { useLocales } from '@context/LocalesContext';
import { FC } from 'react';

const DriveTableHeader: FC = () => {
  const { intl } = useLocales();

  const tableHeadingClasses =
    'pl-4 font-medium text-color-accents-plum-black dark:text-color-shade-light-1-night text-left text-base';

  return (
    <tr className="relative w-full h-16 bg-color-shade-dark-4-day border dark:bg-color-shade-dark-3-night border-color-shade-dark-4-day dark:border-color-shade-dark-3-night shadow-sm">
      <th className={tableHeadingClasses}>{intl.get('FILE_NAME')}</th>
      <th className={tableHeadingClasses}>{intl.get('FILE_TYPE')}</th>
      <th className={tableHeadingClasses}>{intl.get('FILE_SIZE')}</th>
      <th className={`${tableHeadingClasses} hidden md:table-cell`}>
        {intl.get('CREATED')}
      </th>
      <th>{/* Empty Table Header for Dropdown Menu */}</th>
    </tr>
  );
};

export default DriveTableHeader;
