import { FC } from 'react';

import NetworkDropdownMenu from './NetworkDropdownMenu';
import NetworkDropdownToggele from './NetworkDropdownToggle';
import { Network } from '@data/networks';
import { Menu } from '@headlessui/react';

export interface NetworkDropdownProps {
  value: Network;
  className?: string;
  onChange: (network: Network) => void;
}

const NetworkDropdown: FC<NetworkDropdownProps> = ({
  value,
  className,
  onChange,
}) => {
  return (
    <Menu as="div" className={`relative flex cursor-default ${className}`}>
      {({ open }) => (
        <>
          <NetworkDropdownToggele open={open} value={value} />

          <NetworkDropdownMenu onSelect={onChange} />
        </>
      )}
    </Menu>
  );
};

export default NetworkDropdown;
