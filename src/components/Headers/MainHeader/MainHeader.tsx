import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import { Button } from '@components/Buttons';

import MenuLight from '@media/UI/menu-light.svg';
import MenuDark from '@media/UI/menu-dark.svg';

import SortLight from '@media/UI/sort-light.svg';
import SortDark from '@media/UI/sort-dark.svg';

interface MainHeaderProps {
  title: string;
  toggleSort: () => void;
}

const MainHeader: FC<MainHeaderProps> = ({ title, toggleSort }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-lg text-color-accents-purple-black dark:text-color-shade-white-night">
          {title}
        </h2>

        <div>
          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <MenuLight /> : <MenuDark />}
            className="mx-1"
            padding="p-3"
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
