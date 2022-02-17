import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';

interface DriveItemDropdownToggleProps {
  onClickHandler: () => void;
}

const DriveItemDropdownToggle: FC<DriveItemDropdownToggleProps> = ({
  onClickHandler,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className="py-2 px-4 cursor-pointer"
      onClick={() => onClickHandler()}
    >
      {theme === 'light' ? <DropdownMenuIconLight /> : <DropdownMenuIconDark />}
    </button>
  );
};

export default DriveItemDropdownToggle;
