import { FC, useContext } from 'react';
import ThemeContext from '@context/ThemeContext';
import { Menu } from '@headlessui/react';
import { Network } from '@data/networks';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';

import classes from './NetworkDropdownToggle.module.scss';

export interface NetworkDropdownToggeleProps {
  value: Network;
  open: boolean;
}

const NetworkDropdownToggele: FC<NetworkDropdownToggeleProps> = ({
  value,
  open,
}) => {
  const { theme } = useContext(ThemeContext);

  const arrowClasses = `absolute right-4 ${classes.arrow} ${
    open ? classes.arrowOpen : ''
  }`;

  return (
    <Menu.Button className="flex justify-center items-center p-2 text-center w-full cursor-pointer border-solid border-2 rounded-sm border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow font-semibold text-lg hover:bg-color-shade-dark-3-day dark:hover:bg-color-shade-dark-2-night text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
      {value.name}
      {theme === 'light' ? (
        <ArrowRightLight className={arrowClasses} />
      ) : (
        <ArrowRightDark className={arrowClasses} />
      )}
    </Menu.Button>
  );
};

export default NetworkDropdownToggele;
