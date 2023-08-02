import { useContext } from 'react';
import { Menu } from '@headlessui/react';

import ThemeContext from '@context/ThemeContext';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';

const DriveItemDropdownToggle = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Menu.Button className="py-2 px-4 cursor-pointer">
      {theme === 'light' ? <DropdownMenuIconLight /> : <DropdownMenuIconDark />}
    </Menu.Button>
  );
};

export default DriveItemDropdownToggle;
