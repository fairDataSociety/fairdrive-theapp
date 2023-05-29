import { useContext } from 'react';
import { Menu } from '@headlessui/react';

import ThemeContext from '@context/ThemeContext';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';
import PodContext from '@context/PodContext';

const PodDropdownToggele = () => {
  const { theme } = useContext(ThemeContext);
  const { activePod, setDirectoryName } = useContext(PodContext);

  return (
    <Menu.Button className="flex items-center w-full cursor-pointer">
      <div className="py-2 px-4 ">
        {theme === 'light' ? (
          <DropdownMenuIconLight />
        ) : (
          <DropdownMenuIconDark />
        )}
      </div>
      <span
        onClick={() => setDirectoryName('root')}
        className="font-semibold text-lg cursor-pointer hover:bg-color-shade-dark-3-day text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar"
      >
        {activePod || 'Select a pod'}
      </span>
    </Menu.Button>
  );
};

export default PodDropdownToggele;
