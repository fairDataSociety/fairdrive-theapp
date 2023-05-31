import { Menu } from '@headlessui/react';

import PodDropdownToggele from './PodDropdownToggle';
import PodDropdownMenu from './PodDropdownMenu';

const PodDropdown = () => {
  return (
    <Menu as="div" className="relative flex cursor-default">
      <PodDropdownToggele />

      <PodDropdownMenu />
    </Menu>
  );
};

export default PodDropdown;
