import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';
import PodContext from '@context/PodContext';

export interface PodDropdownToggeleProps {
  onClickHandler: () => void;
}

const PodDropdownToggele: FC<PodDropdownToggeleProps> = ({
  onClickHandler,
}) => {
  const { theme } = useContext(ThemeContext);
  const { activePod, setDirectoryName } = useContext(PodContext);

  return (
    <div className="flex items-center w-full">
      <button
        className="flex py-2 px-4 cursor-pointer"
        onClick={() => onClickHandler()}
      >
        {theme === 'light' ? (
          <DropdownMenuIconLight />
        ) : (
          <DropdownMenuIconDark />
        )}
      </button>
      <span
        onClick={() => setDirectoryName('root')}
        className="font-semibold text-lg cursor-pointer hover:bg-color-shade-dark-3-day text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar"
      >
        {activePod || 'Select a pod'}
      </span>
    </div>
  );
};

export default PodDropdownToggele;
