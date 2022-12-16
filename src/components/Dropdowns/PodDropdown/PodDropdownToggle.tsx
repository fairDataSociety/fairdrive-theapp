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
  const { activePod } = useContext(PodContext);

  return (
    <div className="flex items-center w-full">
      <span className="font-semibold text-lg text-color-accents-purple-black dark:text-color-shade-white-night">
        {activePod || 'Select a pod'}
      </span>
      <button
        className="flex py-2 ml-auto px-4 cursor-pointer"
        onClick={() => onClickHandler()}
      >
        {theme === 'light' ? (
          <DropdownMenuIconLight />
        ) : (
          <DropdownMenuIconDark />
        )}
      </button>
    </div>
  );
};

export default PodDropdownToggele;
