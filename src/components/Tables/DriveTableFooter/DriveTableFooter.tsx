import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Select } from '@components/Inputs';

import PageUpLight from '@media/UI/page-up-light.svg';
import PageUpDark from '@media/UI/page-up-dark.svg';

import PageDownLight from '@media/UI/page-down-light.svg';
import PageDownDark from '@media/UI/page-down-dark.svg';
import { useLocales } from '@context/LocalesContext';

interface DriveTableFooterProps {
  page: number;
  rowsPerPage: number;
  totalDriveItems: number;
  updateRowsPerPage: (newRows: number) => void;
  pageUp: () => void;
  pageDown: () => void;
}

const DriveTableFooter: FC<DriveTableFooterProps> = ({
  page,
  rowsPerPage,
  totalDriveItems,
  updateRowsPerPage,
  pageUp,
  pageDown,
}) => {
  const { theme } = useContext(ThemeContext);
  const { intl } = useLocales();

  const rowsPerPageOptions = [
    {
      value: '10',
      label: '10',
    },
    {
      value: '20',
      label: '20',
    },
    {
      value: '50',
      label: '50',
    },
    {
      value: '100',
      label: '100',
    },
  ];

  const handleUpdateRowsPerPage = (value: string) => {
    updateRowsPerPage(parseInt(value));
  };

  return (
    <div className="flex justify-end items-center w-full h-16 pr-4 font-medium text-color-accents-plum-black dark:text-color-shade-light-1-night bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow">
      <div className="px-5">
        <span className="inline-block mr-2">{intl.get('ROWS_PER_PAGE')}</span>

        <Select
          name="Rows Per Page"
          options={rowsPerPageOptions}
          updateValue={handleUpdateRowsPerPage}
        />
      </div>

      <div className="px-5">
        {`
        ${page * rowsPerPage + 1}-${
          page * rowsPerPage + rowsPerPage > totalDriveItems
            ? totalDriveItems
            : page * rowsPerPage + rowsPerPage
        } of
        ${totalDriveItems}`}
      </div>

      <div className="px-5">
        <span className="inline-block mr-3 cursor-pointer" onClick={pageDown}>
          {theme === 'light' ? <PageDownLight /> : <PageDownDark />}
        </span>
        <span className="inline-block ml-3 cursor-pointer" onClick={pageUp}>
          {theme === 'light' ? <PageUpLight /> : <PageUpDark />}
        </span>
      </div>
    </div>
  );
};

export default DriveTableFooter;
