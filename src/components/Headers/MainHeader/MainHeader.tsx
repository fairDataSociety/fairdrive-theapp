import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';

import DriveViewListLight from '@media/UI/drive-view-list-light.svg';
import DriveViewListDark from '@media/UI/drive-view-list-dark.svg';
import DriveViewGridLight from '@media/UI/drive-view-grid-light.svg';
import DriveViewGridDark from '@media/UI/drive-view-grid-dark.svg';

import SortLight from '@media/UI/sort-light.svg';
import SortDark from '@media/UI/sort-dark.svg';

interface MainHeaderProps {
  title: string | JSX.Element;
  driveView: 'grid' | 'list';
  toggleView: () => void;
  toggleSort: () => void;
}

const MainHeader: FC<MainHeaderProps> = ({
  title,
  driveView,
  toggleView,
  toggleSort,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-lg text-color-accents-purple-black dark:text-color-shade-white-night">
          {title}
        </h2>

        <div className="hidden md:block">
          <Button
            type="button"
            variant="primary"
            icon={
              driveView === 'grid' ? (
                theme === 'light' ? (
                  <DriveViewListLight />
                ) : (
                  <DriveViewListDark />
                )
              ) : theme === 'light' ? (
                <DriveViewGridLight />
              ) : (
                <DriveViewGridDark />
              )
            }
            className="mx-1"
            padding="p-3"
            onClick={toggleView}
          />

          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <SortLight /> : <SortDark />}
            className="mx-1"
            padding="p-3"
            onClick={toggleSort}
          />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
