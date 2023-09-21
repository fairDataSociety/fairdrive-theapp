import { Network, networks } from '@data/networks';
import { FC } from 'react';
import DropdownTransition from '../DropdownTransition';
import { Menu } from '@headlessui/react';

export interface NetworkDropdownMenuProps {
  onSelect: (network: Network) => void;
}

const NetworkDropdownMenu: FC<NetworkDropdownMenuProps> = ({ onSelect }) => {
  return (
    <DropdownTransition>
      <Menu.Items className="absolute top-12 w-full bg-color-shade-dark-1-day dark:bg-color-shade-dark-2-night text-left rounded-md shadow z-30">
        {networks.map((network) => (
          <Menu.Item
            key={network.id}
            as="span"
            className="block w-auto px-5 py-2 font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer dark:hover:bg-color-shade-dark-3-night dark:hover:shadow-soft-purple hover:shadow-soft-purple hover:bg-color-shade-dark-3-day"
            onClick={() => onSelect(network)}
          >
            {network.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </DropdownTransition>
  );
};

export default NetworkDropdownMenu;
