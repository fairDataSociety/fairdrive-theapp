import { useLocales } from '@context/LocalesContext';
import DropdownTransition from '../DropdownTransition';
import { Menu } from '@headlessui/react';

import classes from './LanguageDropdownMenu.module.scss';

export interface LanguageDropdownMenuProps {
  onClose: () => void;
}

function LanguageDropdownMenu() {
  const { languageCodes, getFlagImage, setCurrentLocale } = useLocales();

  return (
    <DropdownTransition>
      <Menu.Items className="absolute top-12 w-full bg-color-shade-dark-1-day dark:bg-color-shade-dark-2-night text-left rounded-md shadow z-30">
        {languageCodes.map((language) => (
          <Menu.Item
            key={language}
            as="span"
            className="flex w-auto px-1 py-2 font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer dark:hover:bg-color-shade-dark-3-night dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-dark-3-day"
            onClick={() => setCurrentLocale(language)}
          >
            <img
              className={`m-auto ${classes.flag}`}
              src={getFlagImage(language).src}
              alt={language}
            />
          </Menu.Item>
        ))}
      </Menu.Items>
    </DropdownTransition>
  );
}

export default LanguageDropdownMenu;
