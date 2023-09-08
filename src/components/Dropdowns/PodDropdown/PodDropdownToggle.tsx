import { useContext } from 'react';
import { Menu } from '@headlessui/react';

import ThemeContext from '@context/ThemeContext';

import DropdownMenuIconLight from '@media/UI/dropdown-menu-light.svg';
import DropdownMenuIconDark from '@media/UI/dropdown-menu-dark.svg';
import PodContext from '@context/PodContext';
import { useLocales } from '@context/LocalesContext';
import { Button } from '@components/Buttons';

import PageDownLight from '@media/UI/page-down-light.svg';
import PageDownDark from '@media/UI/page-down-dark.svg';

const PodDropdownToggele = () => {
  const { theme } = useContext(ThemeContext);
  const { activePod, setActivePod, setDirectoryName } = useContext(PodContext);
  const { intl } = useLocales();

  const onBackToDrive = () => {
    setActivePod('');
    setDirectoryName('');
  };

  return (
    <>
      {activePod && (
        <Button
          variant="tertiary"
          onClick={onBackToDrive}
          icon={
            theme === 'light' ? (
              <PageDownLight className="inline ml-2" />
            ) : (
              <PageDownDark className="inline ml-2" />
            )
          }
          className="m-auto sm:block md:hidden"
        />
      )}
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
          {activePod || intl.get('SELECT_A_POD')}
        </span>
      </Menu.Button>
    </>
  );
};

export default PodDropdownToggele;
